function useDebounce(cb, delay = 2000) {
    let timerId;
    return (...args) => {
        clearInterval(timerId);
        timerId = setTimeout(() => {
            cb(...args);
        }, delay)
    }
}

export default useDebounce;