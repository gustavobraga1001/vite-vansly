export function LayoutAdmin({ children }) {
    return (
        <div>
            <header>Admin Dashboard</header>
            <main>{children}</main>
            <footer>Admin Footer</footer>
        </div>
    );
};
