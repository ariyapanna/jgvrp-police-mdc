export function copyToClipboard(text: string): boolean 
{
    if(!text) 
        return false;

    try 
    {
        const textarea = document.createElement("textarea");

        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.top = "0";
        textarea.style.left = "0";
        textarea.style.opacity = "0";
        textarea.style.pointerEvents = "none";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        const success = document.execCommand("copy");

        document.body.removeChild(textarea);

        return success;
    } 
    catch (e: any) 
    {
        return false;
    }
}
