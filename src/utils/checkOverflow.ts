export default function checkOverflow(element: HTMLElement) {
    return (
        element.scrollHeight !==
        Math.max(element.offsetHeight, element.clientHeight)
    );
}
