'use client';

import {FormEvent, useState} from 'react';

const BookEvent = () =>{

    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setSubmitted(true);
            setIsSubmitting(false);
        }, 1000);
    }

    return (
        <div id="book-event">
            {submitted ? (
                <p className="text-sm">Thank you for signing up</p>
            ): (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" value={email} required
                               id="email"
                               placeholder="Enter your Email Address"
                               onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <button type="submit" className="button-submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>

                </form>
            )}
        </div>
    )
}

export default BookEvent;