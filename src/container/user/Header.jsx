import React from 'react';

const Header = () => {
	return (
		<nav className="h-10 bg-primary flex justify-between box-border px-28 items-center text-white">
			<div>
				<ul className="flex">
					<li>+255 768 356 890</li>
					<li>info@zpunet.com</li>
				</ul>
			</div>
			<div>
				<ul className="flex">
					<li>Login</li>
					<li>Register</li>
				</ul>
			</div>
		</nav>
	);
};

export default Header;