
import { type Ref, onMounted, onBeforeUnmount } from 'vue'
import { useMotion } from '@vueuse/motion'

export function useMottoAnimation(
    startSRef: Ref<HTMLElement | null>,
    startFRef: Ref<HTMLElement | null>,
    startXRef: Ref<HTMLElement | null>,
    startCRef: Ref<HTMLElement | null>,
    endSRef: Ref<HTMLElement | null>,
    endFRef: Ref<HTMLElement | null>,
    endXRef: Ref<HTMLElement | null>,
    endCRef: Ref<HTMLElement | null>,
) {
    const { apply: applyS } = useMotion(startSRef, {
        initial: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 },
    })

    const { apply: applyF } = useMotion(startFRef, {
        initial: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 },
    })

    const { apply: applyX } = useMotion(startXRef, {
        initial: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 },
    })

    const { apply: applyC } = useMotion(startCRef, {
        initial: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 },
    })

    const timers: ReturnType<typeof setTimeout>[] = []

    function schedule(callback: () => void, delay: number) {
        timers.push(setTimeout(callback, delay))
    }

    function getElementCenterDiff(
        startEl: HTMLElement,
        endEl: HTMLElement,
    ) {
        const startRect = startEl.getBoundingClientRect()
        const endRect = endEl.getBoundingClientRect()

        return {
            dx:
                endRect.left +
                endRect.width / 2 -
                (startRect.left + startRect.width / 2),
            dy:
                endRect.top +
                endRect.height / 2 -
                (startRect.top + startRect.height / 2),
        }
    }

    async function flyLetter(
        apply: typeof applyS,
        dx: number,
        dy: number,
        rotation: number,
    ) {
        await apply({
            x: dx * 0.5,
            y: dy * 0.5 - 20,
            scale: 1.3,
            rotate: rotation,
            transition: {
                type: 'tween',
                ease: 'easeInOut',
                duration: 400,
            },
        })

        await apply({
            x: dx,
            y: dy,
            scale: 1.05,
            rotate: 0,
            opacity: 1,
            transition: {
                type: 'tween',
                ease: 'easeInOut',
                duration: 400,
            },
        })

        await apply({
            opacity: 0,
            transition: { duration: 80 },
        })
    }

    onMounted(() => {
        // Skip the decorative flying-letter animation on mobile
        // and for users who prefer reduced motion.
        if (
            window.matchMedia('(max-width: 767px)').matches ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            return
        }

        schedule(() => {
            const startS = startSRef.value
            const startF = startFRef.value
            const startX = startXRef.value
            const startC = startCRef.value

            const endS = endSRef.value
            const endF = endFRef.value
            const endX = endXRef.value
            const endC = endCRef.value

            if (
                !startS ||
                !startF ||
                !startX ||
                !startC ||
                !endS ||
                !endF ||
                !endX ||
                !endC
            ) {
                return
            }

            // Read all positions before starting the animations.
            const s = getElementCenterDiff(startS, endS)
            const f = getElementCenterDiff(startF, endF)
            const x = getElementCenterDiff(startX, endX)
            const c = getElementCenterDiff(startC, endC)

            schedule(() => void flyLetter(applyS, s.dx, s.dy, -15), 5500)
            schedule(() => void flyLetter(applyF, f.dx, f.dy, 15), 6500)
            schedule(() => void flyLetter(applyX, x.dx, x.dy, -15), 7500)
            schedule(() => void flyLetter(applyC, c.dx, c.dy, 15), 8500)
        }, 500)
    })

    onBeforeUnmount(() => {
        timers.forEach(clearTimeout)
        timers.length = 0
    })
}
