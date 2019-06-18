
import React, { useState } from 'react';

import {
    makeStyles,
    Button,
    List,
    Radio,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    RadioGroup,
    FormControlLabel
} from '@material-ui/core/';

function AssignmentRow(props) {
    const { title, optionsArr, onClose, value: valueProp, open, ...other } = props;
    const [value, setValue] = useState(valueProp);
    const radioGroupRef = React.useRef(null);
    const classes = useStyles();

    React.useEffect(() => {
        if (!open) {
            setValue(valueProp);
        }
    }, [valueProp, open]);

    function handleEntering() {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    }

    function handleCancel() {
        onClose('Cancel');
    }

    function handleOk() {
        onClose(value);
    }

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            onEntering={handleEntering}
            aria-labelledby="confirmation-dialog-title"
            open={open}
            {...other}
        >
            <DialogTitle id="confirmation-dialog-title" className={classes.title}>{title}</DialogTitle>
            <DialogContent dividers>
                <RadioGroup
                    ref={radioGroupRef}
                    value={value}
                    onChange={handleChange}
                    className={classes.options}

                >
                    {optionsArr.map(option => {

                        let label = '';
                        if (option.firstName === 'None') {
                            label = option.firstName
                            return <FormControlLabel value={option.firstName} key={option.fid} control={<Radio color="primary" />} label={label} labelPlacement="start" />
                        }
                        else {
                            label = option.neighborhood + ', ' + option.city + ', ' + option.firstName + ' ' + option.lastName;
                            return <FormControlLabel value={option.fid} key={option.fid} control={<Radio color="primary" />} label={label} labelPlacement="start" />
                        }

                    }
                    )}
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
          </Button>
                <Button onClick={handleOk} color="primary">
                    Ok
          </Button>
            </DialogActions>
        </Dialog>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        width: '80%',
        maxHeight: 435,
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
    },
    options: {
        textAlign: 'right',
        alignContent: 'right',
    }
}));

function AssignmentDialog({ title, optionsArr, visible, handleClose }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List component="div" role="list">
                <AssignmentRow
                    classes={{ paper: classes.paper, }}
                    optionsArr={optionsArr}
                    title={title}
                    keepMounted
                    open={visible}
                    onClose={handleClose}
                    value={'None'}
                />
            </List>
        </div>
    );
}

export { AssignmentDialog };