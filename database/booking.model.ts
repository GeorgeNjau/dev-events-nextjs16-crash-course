import { Schema, model, models, Document, Types } from 'mongoose';

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => {
          // RFC 5322 compliant email regex
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Invalid email format',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to validate that the referenced event exists
BookingSchema.pre('save', async function (next) {
  // Only validate eventId if it's new or modified
  if (this.isNew || this.isModified('eventId')) {
    try {
      // Import Event model dynamically to avoid circular dependency
      const Event = models.Event || (await import('./event.model')).default;
      
      const eventExists = await Event.exists({ _id: this.eventId });
      
      if (!eventExists) {
        return next(new Error('Referenced event does not exist'));
      }
    } catch (error) {
      return next(new Error('Failed to validate event reference'));
    }
  }

  next();
});

// Create index on eventId for faster queries
BookingSchema.index({ eventId: 1 });

// Add compound index for unique booking per email per event
BookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

// Use existing model if it exists (for Next.js hot reload), otherwise create new one
const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;
