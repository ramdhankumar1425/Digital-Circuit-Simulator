import emailjs from "emailjs-com";
import { toast } from "react-toastify";

export const sendMail = (e) => {
    e.preventDefault();

    emailjs
        .sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            e.target,
            import.meta.env.VITE_EMAILJS_USER_ID
        )
        .then(
            () => {
                console.log("Email sent successfully!");
                toast("Email sent successfully");
            },
            (error) => {
                console.error("Error in sending email:", error.text);
                toast.error("Email FAILED");
            }
        );
};
