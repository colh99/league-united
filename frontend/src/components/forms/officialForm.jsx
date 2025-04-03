import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const OfficialForm = ({ initialData, onSubmit }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        role: '',
        contact_email: '',
        mobile_phone: '',
        home_phone: '',
    });

    // Populate formData with initialData when it is available
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.mobile_phone && !formData.home_phone) {
            alert('Please provide at least one phone number.');
            return;
        }
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="first_name">First Name:</label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="last_name">Last Name:</label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="role">Role:</label>
                <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="contact_email">Contact Email:</label>
                <input
                    type="email"
                    id="contact_email"
                    name="contact_email"
                    value={formData.contact_email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="mobile_phone">Mobile Phone:</label>
                <input
                    type="tel"
                    id="mobile_phone"
                    name="mobile_phone"
                    value={formData.mobile_phone}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="home_phone">Home Phone:</label>
                <input
                    type="tel"
                    id="home_phone"
                    name="home_phone"
                    value={formData.home_phone}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default OfficialForm;

OfficialForm.propTypes = {
    initialData: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        role: PropTypes.string,
        contact_email: PropTypes.string,
        mobile_phone: PropTypes.string,
        home_phone: PropTypes.string,
    }),
    onSubmit: PropTypes.func.isRequired,
};