import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";

const teamMembers = [
    { name: "Yash Sharma", role: "Full-Stack Developer", linkedin: "#" },
    { name: "Mukul Yadav", role: "Frontend Developer", linkedin: "#" },
    { name: "Nilesh Sharma", role: "Backend Developer", linkedin: "#" },
    { name: "Mohit Ghanghas", role: "UI/UX Designer", linkedin: "#" },
];

const ContactUs = () => {
    return (
        <div className="p-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            {/* Team Section */}
            <motion.div 
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-bold mb-6 text-center text-green-500">Meet Our Team</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {teamMembers.map((member, index) => (
                        <Card key={index} className="p-6 border rounded-2xl shadow-lg bg-gray-100">
                            <CardContent className="flex flex-col items-center text-center">
                                <h2 className="text-2xl font-semibold text-gray-800">{member.name}</h2>
                                <p className="text-gray-600 mb-2">{member.role}</p>
                                <a href={member.linkedin} className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin size={24} />
                                </a>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div 
                className="w-full md:w-1/2 bg-white p-8 rounded-2xl shadow-lg"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-bold mb-6 text-center text-green-500">Contact Us</h1>
                <Input type="text" placeholder="Your Name" className="mb-4 p-4 border border-gray-300 rounded-lg" />
                <Input type="email" placeholder="Your Email" className="mb-4 p-4 border border-gray-300 rounded-lg" />
                <Textarea placeholder="Your Message" className="mb-4 p-4 border border-gray-300 rounded-lg" rows={5} />
                <Button className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition">Send Message</Button>
                
                {/* Additional Contact Details */}
                <div className="mt-6 text-center text-gray-700">
                    <p className="flex items-center justify-center gap-2"><FaEnvelope /> contact@yourdomain.com</p>
                    <p className="flex items-center justify-center gap-2 mt-2"><FaPhone /> +91 12345 67890</p>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactUs;