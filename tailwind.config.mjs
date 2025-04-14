export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {

        },
    },
    plugins: [
        function ({ addComponents }) {
            addComponents({
                '.btn-custom': {
                    backgroundColor: '#1E3A8A',
                    color: '#fff',
                    padding: '.5rem 1rem',
                    borderRadius: '.375rem',
                    '&:hover': {
                        backgroundColor: '#1D4ED8',
                    },
                },
            });
        },
    ],
};