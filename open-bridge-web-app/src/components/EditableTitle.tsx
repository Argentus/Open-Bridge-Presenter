import { Box, Heading, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";

export interface SetlistTitleProps {
    title?: string;
    updateTitle?: (title: string) => void;
    fontSize?: string;
    placeholder?: string;
    caps?: boolean;
}
const EditableTitle = ({title, updateTitle, caps = false, fontSize = '20px', placeholder = 'Názov'}: SetlistTitleProps) => {

    const [editing, setEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const color = (title && title.length > 0) ? 'neutral.500' : 'neutral.800';

    const finishEdit = () => {
        setEditing(false);
        if (inputRef.current?.value !== title) {
            updateTitle && updateTitle(inputRef.current?.value || "");
        }
    }

    return (
        <Box mr='25px' >
        {
            editing ? (
                <Input ref={inputRef}
                    border='none'
                    textAlign='center'
                    outline='none'
                    fontSize={fontSize}
                    fontWeight='400'
                    color='neutral.500'
                    onBlur={finishEdit}
                    onKeyUp={(event) => {
                        if (event.key === 'Enter') {
                            finishEdit();
                        }
                    }}
                    defaultValue={title}
                    textTransform={caps ? 'uppercase' : 'none'}
                    mt='10px'
                />
            ) : (
                <Heading as="h1"
                    size="lg"
                    textAlign="center"
                    mt={4} fontWeight='400'
                    fontSize={fontSize} color={color}
                    onClick={() => {
                        if (!updateTitle) return;   // If no update function, don't allow editing
                        setEditing(true);
                        setTimeout(() => {
                            inputRef.current?.focus();
                        }, 0);
                    }}
                    mb='6px'
                    textTransform={caps ? 'uppercase' : 'none'}
                >
                    {title || placeholder}
                </Heading>
            )
        }
        </Box>
    );
}

export default EditableTitle;