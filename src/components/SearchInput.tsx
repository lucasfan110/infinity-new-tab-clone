import "./SearchInput.css";

export default function SearchInput() {
    return (
        <div className="search-input">
            <img
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt="google"
                className="icon"
            />
            <input
                placeholder="Enter search"
                className="search p-2 outline-none h-full w-full mr-3"
            />
        </div>
    );
}
