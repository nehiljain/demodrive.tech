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
				className="w-full h-14 rounded-full bg-[#1a1a1a] border-[#333]
					text-white text-lg pl-6 pr-48"
			/>
			<Button
				type="submit"
				disabled={isLoading}
				className="absolute right-1.5 h-11 px-8 rounded-full
					bg-[#d1ff1a] hover:bg-[#c5f00f] text-black font-medium
					transition-colors duration-200"
			>
				{isLoading ? 'Joining...' : success ? 'Joined!' : 'Join Waitlist'}
			</Button>
			{error && (
				<p className="absolute -bottom-6 left-0 text-sm text-red-500">
					{error}
				</p>
			)}
			{success && (
				<p className="absolute -bottom-6 left-0 text-sm text-green-500">
					Thanks for joining! We&apos;ll be in touch soon.
				</p>
			)}
		</form>
	)
}