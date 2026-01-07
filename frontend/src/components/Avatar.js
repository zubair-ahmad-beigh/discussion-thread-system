import React from 'react';
import './Avatar.css';

const Avatar = ({ username, size = 'medium' }) => {
    if (!username) {
        return <div className={`avatar avatar-${size} avatar-default`}>?</div>;
    }

    const getInitials = (name) => {
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const getColor = (name) => {
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
            '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    const initials = getInitials(username);
    const bgColor = getColor(username);

    return (
        <div
            className={`avatar avatar-${size}`}
            style={{ backgroundColor: bgColor }}
            title={username}
        >
            {initials}
        </div>
    );
};

export default Avatar;
