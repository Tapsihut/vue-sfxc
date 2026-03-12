import { type Ref, onMounted } from 'vue'
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

    function getElementCenterDiff(startEl: HTMLElement, endEl: HTMLElement) {
        const startRect = startEl.getBoundingClientRect()
        const endRect = endEl.getBoundingClientRect()
        return {
            dx: endRect.left + endRect.width / 2 - (startRect.left + startRect.width / 2),
            dy: endRect.top + endRect.height / 2 - (startRect.top + startRect.height / 2),
        }
    }

    async function flyLetter(apply: typeof applyS, dx: number, dy: number, rotation: number) {
        await apply({
            x: dx * 0.5,
            y: dy * 0.5 - 30,
            scale: 1.5,
            rotate: rotation,
            transition: { type: 'tween', ease: 'easeInOut', duration: 600 },
        })
        await apply({
            x: dx,
            y: dy,
            scale: 1.125,
            rotate: 0,
            opacity: 1,
            transition: { type: 'tween', ease: 'easeInOut', duration: 600 },
        })
        apply({ opacity: 0, transition: { duration: 50 } })
    }

    onMounted(() => {
        setTimeout(() => {
            if (
                !startSRef.value ||
                !startFRef.value ||
                !startXRef.value ||
                !startCRef.value ||
                !endSRef.value ||
                !endFRef.value ||
                !endXRef.value ||
                !endCRef.value
            )
                return

            const { dx: sDx, dy: sDy } = getElementCenterDiff(startSRef.value, endSRef.value)
            const { dx: fDx, dy: fDy } = getElementCenterDiff(startFRef.value, endFRef.value)
            const { dx: xDx, dy: xDy } = getElementCenterDiff(startXRef.value, endXRef.value)
            const { dx: cDx, dy: cDy } = getElementCenterDiff(startCRef.value, endCRef.value)

            // Scheduled relative to elapsed time (~500 ms since mount)
            setTimeout(() => flyLetter(applyS, sDx, sDy, -15), 5500)
            setTimeout(() => flyLetter(applyF, fDx, fDy, 15), 6500)
            setTimeout(() => flyLetter(applyX, xDx, xDy, -15), 7500)
            setTimeout(() => flyLetter(applyC, cDx, cDy, 15), 8500)
        }, 500)
    })
}
