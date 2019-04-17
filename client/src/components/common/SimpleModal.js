import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import { closeModal } from "../../actions/productActions";

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
        const { classes, isModalOpen } = this.props;

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
                            SUCCESS
                        </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                            Product successfully added
                        </Typography>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.products.loading,
    isModalOpen: state.products.isModalOpen,
    modalType: state.products.modalType
});

const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default connect(
    mapStateToProps
)(SimpleModalWrapped);
