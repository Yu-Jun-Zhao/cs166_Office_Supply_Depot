import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
<<<<<<< HEAD
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import { closeModal } from "../../actions/productActions";
=======
import {connect} from "react-redux";
import { closeModal } from "../../actions/modalActions";
>>>>>>> evan_branch

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
});

class SimpleModal extends React.Component {
    state = {
        open: false,
    };

    handleClose = () => {
        this.props.dispatch(closeModal())
    };

    render() {
<<<<<<< HEAD
        const { classes, isModalOpen, modalType } = this.props;
=======
        const { classes, isModalOpen, modalProps } = this.props;
>>>>>>> evan_branch

        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={isModalOpen}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="h6" id="modal-title">
                            {
<<<<<<< HEAD
                                modalType === 'success' ? <div> SUCCESS </div> : <div> FAIL </div>
=======
                                modalProps && <div> {modalProps["status"]} </div>
>>>>>>> evan_branch
                            }
                        </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                            {
<<<<<<< HEAD
                                modalType === 'success' ? <div>Successfully added product</div> : <div>Failed to add product</div>
=======
                                modalProps && <div> {modalProps["message"]} </div>
>>>>>>> evan_branch
                            }
                        </Typography>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.products.loading,
<<<<<<< HEAD
    isModalOpen: state.products.isModalOpen,
    modalType: state.products.modalType
=======
    isModalOpen: state.modal.isModalOpen,
    modalProps: state.modal.modalProps
>>>>>>> evan_branch
});

const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default connect(
    mapStateToProps
<<<<<<< HEAD
)(SimpleModalWrapped);
=======
)(SimpleModalWrapped);
>>>>>>> evan_branch
