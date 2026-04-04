import { useState } from 'react'
import Button from './Button'
import Card from './Card'

function TrainingForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    course: 'MERN Stack Development',
    education: '',
    message: '',
  })
  const [status, setStatus] = useState({ loading: false, error: null, success: null })

  const update = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, error: null, success: null })

    if (!form.name || !form.email) {
      setStatus({ loading: false, error: 'Please provide name and email.' })
      return
    }

    const payload = {
      name: form.name,
      email: form.email,
      service: 'Training & Internship',
      message: `Phone: ${form.phone}\nCity: ${form.city}\nCourse: ${form.course}\nEducation: ${form.education}\n\nMessage:\n${form.message}`,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok || !data.ok) {
        throw new Error(data.message || 'Submission failed')
      }

      setStatus({ loading: false, error: null, success: 'Application submitted. We will contact you shortly.' })
      setForm({ name: '', email: '', phone: '', city: '', course: 'MERN Stack Development', education: '', message: '' })
    } catch (err) {
      setStatus({ loading: false, error: err.message || 'Submission error', success: null })
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-[#C3CCE2]">Full Name</label>
          <input value={form.name} onChange={update('name')} className="mt-1 w-full rounded-md bg-[#04060A] border border-white/10 px-3 py-2 text-sm text-[#EAF0FF]" />
        </div>
        <div>
          <label className="text-sm text-[#C3CCE2]">Email</label>
          <input value={form.email} onChange={update('email')} type="email" className="mt-1 w-full rounded-md bg-[#04060A] border border-white/10 px-3 py-2 text-sm text-[#EAF0FF]" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-[#C3CCE2]">Phone</label>
            <input value={form.phone} onChange={update('phone')} className="mt-1 w-full rounded-md bg-[#04060A] border border-white/10 px-3 py-2 text-sm text-[#EAF0FF]" />
          </div>
          <div>
            <label className="text-sm text-[#C3CCE2]">City</label>
            <input value={form.city} onChange={update('city')} className="mt-1 w-full rounded-md bg-[#04060A] border border-white/10 px-3 py-2 text-sm text-[#EAF0FF]" />
          </div>
        </div>

        <div>
          <label className="text-sm text-[#C3CCE2]">Course Interested</label>
          <select value={form.course} onChange={update('course')} className="mt-1 w-full rounded-md bg-[#04060A] border border-white/10 px-3 py-2 text-sm text-[#EAF0FF]">
            <option>MERN Stack Development</option>
            <option>Java & Spring Boot</option>
            <option>Python Backend Development</option>
            <option>SQL & Databases</option>
            <option>Front-End Development</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-[#C3CCE2]">Education / Current Status</label>
          <input value={form.education} onChange={update('education')} className="mt-1 w-full rounded-md bg-[#04060A] border border-white/10 px-3 py-2 text-sm text-[#EAF0FF]" />
        </div>

        <div>
          <label className="text-sm text-[#C3CCE2]">Message</label>
          <textarea value={form.message} onChange={update('message')} rows={4} className="mt-1 w-full rounded-md bg-[#04060A] border border-white/10 px-3 py-2 text-sm text-[#EAF0FF]" />
        </div>

        {status.error ? <p className="text-sm text-[#FF9AA2]">{status.error}</p> : null}
        {status.success ? <p className="text-sm text-[#8BD8FF]">{status.success}</p> : null}

        <div className="flex items-center gap-3">
          <Button as="button" type="submit" disabled={status.loading}>
            {status.loading ? 'Submitting…' : 'Apply'}
          </Button>
          <Button to="/contact" variant="secondary">Contact Us</Button>
        </div>
      </form>
    </Card>
  )
}

export default TrainingForm
