"use client";
import React from "react";

import { useContext, useEffect, useRef, useState } from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Button,
    Grid,
    Typography,
    Tooltip
} from '@mui/material';
import {
    CheckCircle,
    Cancel,
    Undo,
    Redo,
    Close
} from '@mui/icons-material';
import Image from 'next/image';

const marksData = [
    { questionNo: 1, mark: 2, scoredMark: 0 },
    { questionNo: 2, mark: 1.5, scoredMark: 0 },

];
export default function Home() {

    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [selectedMark, setSelectedMark] = useState(null);
    const [imageSrc, setImageSrc] = useState(''); // Replace with actual image source
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);

    useEffect(() => {
    //     // Fetch image source based on selected question (if needed)
    //     // if (selectedQuestion) {
    //         // Logic to get image source for the selected question
            setImageSrc(`/ans3.jpeg`); 
    //     // }
    }, []);

    return (
        <div className='select-none flex flex-col items-center pt-5 w-full h-full bg-[#F5F5F5] overflow-x-auto'>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Drawer variant="permanent" anchor="left">
                        {/* <List>
                            {marksData.map((mark) => (
                                <ListItem key={mark.questionNo} button onClick={() => handleQuestionSelect(mark)}>
                                    <ListItemText primary={`Question ${mark.questionNo}`} secondary={`Mark: ${mark.mark}`} />
                                </ListItem>
                            ))}
                        </List> */}
                    </Drawer>
                </Grid>
                <Grid item xs={9}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {imageSrc && (
                                <Image src={imageSrc} alt="Answer Script" width={800} height={600} />
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">Select Mark:</Typography>
                            <Grid container spacing={1}>
                                {Array.from({ length: 20 }, (_, i) => (
                                    <Grid item key={i}>
                                        {/* <Button
                                            variant={selectedMark === (i + 0.5) / 2 ? 'contained' : 'outlined'}
                                            onClick={() => handleMarkSelect((i + 0.5) / 2)}
                                        >
                                            {(i + 0.5) / 2}
                                        </Button> */}
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Tooltip title="Mark">
                                        {/* <IconButton onClick={handleMarkOnImage}>
                                            <CheckCircle />
                                        </IconButton> */}
                                    </Tooltip>
                                </Grid>
                                <Grid item>
                                    <Tooltip title="Wrong">
                                        <IconButton>
                                            <Cancel />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item>
                                    <Tooltip title="Undo">
                                        {/* <IconButton onClick={handleUndo}>
                                            <Undo />
                                        </IconButton> */}
                                    </Tooltip>
                                </Grid>
                                <Grid item>
                                    <Tooltip title="Redo">
                                        {/* <IconButton onClick={handleRedo}>
                                            <Redo />
                                        </IconButton> */}
                                    </Tooltip>
                                </Grid>
                                <Grid item>
                                    <Tooltip title="Close">
                                        <IconButton>
                                            <Close />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </div>
    )
}
