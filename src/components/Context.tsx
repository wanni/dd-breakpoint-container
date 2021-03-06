/**
 * TODO:
 *
 * More explanation around the existence of
 * of this file, what it's is for (<Breakpoint/>
 * component parsing support) etc
 */

import * as React from 'react';

export const ID_DEFAULT = 'default';
export const ID_BROWSER = 'browser';

// NOTE: Other identifier contexts are created as-needed in WithContext
export const BP_CONTEXTS: { [value: string]: any } = {
	[ID_DEFAULT]: React.createContext(null),
	[ID_BROWSER]: React.createContext(null),
};

interface IProps {
	identifier: string;
	currentBp?: string;
	children: React.ReactNode;
}

/**
 * TODO.
 */
const WithContext = ({ identifier, currentBp, children }: IProps) => {
	// If a BPC has specified an identifier other than the default
	const hasIdentifier = identifier !== ID_DEFAULT;

	// Create specific context if it doesn't already exist
	if (hasIdentifier && !BP_CONTEXTS[identifier]) {
		BP_CONTEXTS[identifier] = React.createContext(null);
	}

	// CoreContext aka 'default' context must always be present, even if the
	// BPC has a specified identifier - this is to enable the default behaviour
	// of <Breakpoint/> components that don't specify an target BPC identifier
	const CoreContext = BP_CONTEXTS[ID_DEFAULT];
	const IdentifierContext = BP_CONTEXTS[identifier];

	return (
		<>
			{hasIdentifier ? (
				<IdentifierContext.Provider value={currentBp}>
					<CoreContext.Provider value={currentBp}>
						{children}
					</CoreContext.Provider>
				</IdentifierContext.Provider>
			) : (
				<IdentifierContext.Provider value={currentBp}>
					{children}
				</IdentifierContext.Provider>
			)}
		</>
	);
};

WithContext.defaultProps = {
	currentBp: null,
};

export { WithContext };
