import type {FC} from 'react';

// The component now accepts an onUnsave function via its props.
type Props = {
    name: string;
    onUnsave: (id: string) => void;
};

const UnsaveButton: FC<Props> = ({ name, onUnsave }) => {
    return (
        // When clicked, it calls the function passed from its parent.
        <button className={"UnsaveBtn"} onClick={() => onUnsave(name)}>
            ×
        </button>
    );
};

export default UnsaveButton;