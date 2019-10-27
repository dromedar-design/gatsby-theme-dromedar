export default () => {
    if (typeof window !== 'undefined') {
        window.location.href = '/'
    }

    return null
}
