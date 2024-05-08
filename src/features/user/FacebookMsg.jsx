import React, { Component} from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

const FacebookMsg = () => {
	return (
		<FacebookProvider appId="2123846281318547" chatSupport>
			<CustomChat pageId="107213784912586" minimized={true}/>
		</FacebookProvider>
	);
};

export default FacebookMsg;