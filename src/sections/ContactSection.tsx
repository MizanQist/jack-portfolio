import { Mail, MessageCircle } from 'lucide-react'
import { FadeIn } from '../components/FadeIn'

const EMAIL = 'nabildeealee@icloud.com'
const WHATSAPP = '+447931814601'

const CHANNELS = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}`, Icon: Mail },
  { label: 'WhatsApp', value: '+44 7931 814601', href: `https://wa.me/${WHATSAPP.replace('+', '')}`, Icon: MessageCircle },
]

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-20 -mt-10 flex min-h-screen flex-col items-center justify-center rounded-t-[40px] bg-white px-5 py-20 text-ink sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn as="h2" y={40} className="text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">
        Contact
      </FadeIn>

      <FadeIn delay={0.15} y={20} className="mt-8 max-w-[560px] text-center text-[clamp(1rem,2vw,1.35rem)] font-light leading-relaxed opacity-60 sm:mt-10">
        Got a project in mind? Send an email or a WhatsApp message and I&apos;ll get back to you.
      </FadeIn>

      <ul className="mt-14 flex flex-col items-center gap-8 sm:mt-20 sm:items-start sm:gap-10">
        {CHANNELS.map(({ label, value, href, Icon }, i) => (
          <FadeIn as="li" key={label} delay={0.3 + i * 0.1} y={20}>
            <a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex flex-col items-center gap-3 sm:flex-row sm:gap-5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-ink transition-colors duration-200 group-hover:bg-ink group-hover:text-white sm:h-14 sm:w-14">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
              </span>
              <span className="flex flex-col items-center sm:items-start">
                <span className="text-xs font-light uppercase tracking-widest opacity-60">{label}</span>
                <span className="break-all text-center text-[clamp(1.25rem,3.4vw,2.75rem)] font-medium leading-tight underline-offset-8 group-hover:underline sm:text-left">
                  {value}
                </span>
              </span>
            </a>
          </FadeIn>
        ))}
      </ul>

      <p className="mt-20 text-xs font-light uppercase tracking-widest opacity-40 sm:mt-28">© {new Date().getFullYear()} Ali</p>
    </section>
  )
}
