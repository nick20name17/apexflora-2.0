export const animations = {
    popLayout: {
        layout: true,
        transition: { duration: 0.25, type: 'spring' },
        initial: { opacity: 0, scale: 0.7 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.7 }
    }
}
