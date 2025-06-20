import nodemailer from "nodemailer";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
export const sendEnquiryEmail = async (req, res) => {
    try {
        const { itemId, itemName, userEmail = "anonymous@user.com" } = req.body;

        if (!itemId || !itemName) {
            return res.status(400).json({ message: "Item ID and name are required" });
        }

        // Setup the transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_SERVER,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_LOGIN,
                pass: process.env.SMTP_PASSWORD,
            },
        })

        const mailOptions = {
            from: `"Item Enquiry Bot" <${process.env.SMTP_EMAIL}>`,
            to: "hello@amrrtechsols.com", // static receiver
            subject: `New Enquiry for Item: ${itemName}`,
            html: `
        <h2>Item Enquiry</h2>
        <p><strong>Item ID:</strong> ${itemId}</p>
        <p><strong>Item Name:</strong> ${itemName}</p>
        <p><strong>User Email:</strong> ${userEmail}</p>
        <p>This is an auto-generated enquiry email.</p>
      `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return res.status(200).json(new ApiResponse(200, {}, "Enquiry email sent successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Failed to send enquiry email", error));
    }
};