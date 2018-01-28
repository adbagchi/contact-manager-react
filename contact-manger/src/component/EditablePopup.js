import React, { Component } from 'react';


class EditablePopup extends Component {
	constructor(props) {
		super();
		if(props.isEditing === true) {
			this.state = {
				headerText: "Edit Existing Contact",
				value: {
					name: props.contactData.name,
					phoneNumber: props.contactData.phoneNumber,
					email: props.contactData.email
				},
				isDeleteVisible: true,
				isValid: {
					name: true,
					phoneNumber: true,
					email: true
				}
			};
		} else {
			this.state = {
				headerText: "Add New Contact",
				value: {
					name: "",
					phoneNumber: "",
					email: ""
				},
				isDeleteVisible: false,
				isValid: {
					name: true,
					phoneNumber: true,
					email: true
				}
			};
		}
	}


	isContactFormValid () {
		var isValid = {
					name: true,
					phoneNumber: true,
					email: true
				};
		if(this.state.value.name.trim() === "") {
			isValid.name = false;
			this.setState({
				isValid: isValid
			});
			return false;
		} else if (this.state.value.phoneNumber.length !== 10 || isNaN(parseInt(this.state.value.phoneNumber))) {
			isValid.phoneNumber = false;
			this.setState({
				isValid: isValid
			});
			return false;
		} else if(!this.state.value.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
			isValid.email = false;
			this.setState({
				isValid: isValid
			});
			return false;
		}
		this.setState({
			isValid: isValid
		});
		return true;
	}


	submitContact (event) {
		event.preventDefault();
		if(this.isContactFormValid.call(this) === true) {
			this.props.submit(this.state.value, this.props.editingItemIndex);
		}
	}


	discardContactPopup () {
		this.props.discardContactPopup();
	}


	onContactInfoChange (element, event) {
		var value = this.state.value;
		value[element] = event.target.value;
		this.setState({
			value: value
		});
	}


  render() {
    return (
      <div className="modal">
      	<div className="modal-content">
		    <form onSubmit={this.submitContact.bind(this)}>
		        <div>
		            <h4>{this.state.headerText}</h4>
		            <div className="input-field">
		                <input type="text" className={this.state.isValid.name === false ? "error" : ""} value={this.state.value.name} onChange={this.onContactInfoChange.bind(this, "name")}/>
		                <label>Name</label>
		            </div>
		            <div className="input-field">
		                <input type="tel" className={this.state.isValid.phoneNumber === false ? "error" : ""} value={this.state.value.phoneNumber} onChange={this.onContactInfoChange.bind(this, "phoneNumber")}/>
		                <label>Phone</label>
		            </div>
		            <div className="input-field">
		                <input type="email" className={this.state.isValid.email === false ? "error" : ""} value={this.state.value.email} onChange={this.onContactInfoChange.bind(this, "email")}/>
		                <label>Email</label>
		            </div>
		        </div>
		        <div className="footer">
		        	<input type="button" className="modal-discard" value="Discard changes" onClick={this.discardContactPopup.bind(this)}/>
		        	<input type="submit" className="modal-submit" value="Press enter or click here" />
		        </div>
		    </form>
	    </div>
	</div>
    );
  }
}

export default EditablePopup;
