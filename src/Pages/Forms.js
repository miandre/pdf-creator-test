import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {FormControl, FormGroup, FormLabel, Switch} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useState} from "react";

const cancers = [
    {
        value: 'Head Cancer',
        label: 'Head Cancer',
    },
    {
        value: 'Foot Cancer',
        label: 'Foot Cancer',
    },
    {
        value: 'Hand Cancer',
        label: 'Hand Cancer',
    },
    {
        value: 'None, all is fine!',
        label: 'None, all is fine!',
    },
];

export default function SelectTextFields() {
    const paperStyle = {padding: '50px 20px', width: 600, margin: "20px auto"}
    const [typeOfCancer, setTypeOfCancer] = useState('None, all is fine!');
    const [willDie, setWillDie] = useState(false);
    const [sampleName, setSampleName] = useState('');
    const owner = {id:2};

    function handlePDF() {
        fetch('https://pdf-creator-test.azurewebsites.net/form/pdf', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
            },
        })
            .then((response) => response.blob())
            .then((blob) => {
                // Create blob link to download
                const url = window.URL.createObjectURL(
                    new Blob([blob]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    `FileName.pdf`,
                );

                // Append to html link element page
                document.body.appendChild(link);

                // Start download
                link.click();

                // Clean up and remove the link
                link.parentNode.removeChild(link);
            });
    }

    const handleSave=(e)=>{
        e.preventDefault()
        const student={sampleName,typeOfCancer,willDie, owner}
        console.log(student)
        const result = fetch("https://pdf-creator-test.azurewebsites.net/form/cancerForm",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)

        }).then(()=>{
            console.log(result)
        })
    }


    const handleChange = (event) => {
        setTypeOfCancer(event.target.value);
    };

    const handleChangeSwitch = (event) => {
        setWillDie(event.target.checked);
    };

    return (

        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off"
        >
            <h1>At least LOOK at the sample before you fill this out!</h1>
            <br/>
            <Paper elevation={3} style={paperStyle}>
                <TextField id={sampleName} label="Sample Name" variant="filled"
                           value={sampleName}
                           onChange={(v) => setSampleName(v.target.value)}
                />
            </Paper>
            <br/>
            <Paper elevation={3} style={paperStyle}>
                <FormControl component="fieldset" variant="standard">
                    <FormLabel component="legend">Final result</FormLabel>
                    <br/>
                    <br/>
                    <FormGroup>
                        <FormControlLabel
                            label={"Type Of Cancer"}
                            labelPlacement={"top"}
                            control={
                                <TextField
                                    id="standard-select-currency-native"
                                    select
                                    value={typeOfCancer}
                                    onChange={handleChange}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    helperText="What type of cancer do the sample indicate?"
                                    variant="standard"
                                >
                                    {cancers.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                            }
                        />
                    </FormGroup>
                    <br/>
                    <br/>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch checked={willDie} onChange={handleChangeSwitch} name="die"/>
                            }
                            label="Person will die"
                            labelPlacement={"top"}
                        />
                    </FormGroup>
                </FormControl>
            </Paper>
            <div>
                <Button variant="contained" onClick={handleSave}>Save</Button>
                <Button variant="contained" onClick={handlePDF}>Print all results to PDF</Button>
            </div>

        </Box>
    );
}