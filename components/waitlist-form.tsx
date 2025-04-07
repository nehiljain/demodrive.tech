'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { supabase } from '@/lib/supabase'

interface WaitlistFormProps {
	className?: string
}

export function WaitlistForm({ className = '' }: WaitlistFormProps) {
	const [email, setEmail] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError('')

		try {
			const { error: supabaseError } = await supabase
				.from('waitlist')
				.insert([{ email }])

			if (supabaseError) throw supabaseError

			setSuccess(true)
			setEmail('')
		} catch (error) {
			console.error('Error submitting email:', error)
			setError('Failed to join waitlist. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={`relative flex w-full max-w-3xl items-center ${className}`}
		>
			<Input
				type="email"
				placeholder="name@work-email.com"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
				className="w-full h-14 rounded-full bg-card/60 border-border backdrop-blur-sm
					text-foreground text-lg pl-6 pr-48 shadow-sm border-accent-glow"
			/>
			<Button
				type="submit"
				disabled={isLoading}
				variant="golden"
				className="absolute right-1.5 h-11 px-8 rounded-full
					transition-all duration-300"
			>
				{isLoading ? 'Joining...' : success ? 'Joined!' : 'Join Waitlist'}
			</Button>
			{error && (
				<p className="absolute -bottom-6 left-0 text-sm text-destructive">
					{error}
				</p>
			)}
			{success && (
				<p className="absolute -bottom-6 left-0 text-sm text-[#10b981]">
					Thanks for joining! We&apos;ll be in touch soon.
				</p>
			)}
		</form>
	)
}