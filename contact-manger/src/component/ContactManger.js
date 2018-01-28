import React, { Component } from 'react';
import EditablePopup from './EditablePopup';
import ContactItem from './ContactItem';
import '../css/contact-manger.css';


class ContactManger extends Component {
	constructor() {
		super();
		var contactList = [];
		if(localStorage.contactList !== undefined) {
			contactList = JSON.parse(localStorage.contactList);
		}
		this.state = {
			contactList: contactList,
			isAdding: false,
			isEditing: false,
			editingItemIndex: undefined
		}
	}


	openAddContact () {
		var isAdding = this.state.isAdding;
		isAdding = !isAdding;
		this.setState({
			isAdding: isAdding
		});
	}

	discardContactPopup () {
		this.setState({
			isAdding: false,
			isEditing: false
		});
	}


	addContact (contactInfo) {
		var contactList = this.state.contactList;
		contactList.push(contactInfo);
		this.setState({
			isAdding: false,
			contactList: contactList
		});
		localStorage.contactList = JSON.stringify(contactList);
	}

	editContact(contactInfo, contactIndex) {
		var contactList = this.state.contactList;
		contactList[contactIndex] = contactInfo;
		this.setState({
			isEditing: false,
			contactList: contactList
		});
		localStorage.contactList = JSON.stringify(contactList);
	}

	openEditContact (index) {
		this.setState({
			editingItemIndex: index,
			isEditing: true
		});
	}

	removeContact (index) {
		var contactList = this.state.contactList;
		contactList.splice(index, 1);
		this.setState({
			contactList: contactList
		});
		localStorage.contactList = JSON.stringify(contactList);

	}

  render() {
  	var contactListUi = this.state.contactList.map((contact, contactIndex) =>
		<ContactItem contact={contact}
			contactIndex={contactIndex}
			key={contactIndex}
			openEditContact={this.openEditContact.bind(this)}
			removeContact={this.removeContact.bind(this)}/>
  	);
  	var editablePopupUi = null;
  	if(this.state.isAdding === true) {
  		editablePopupUi = <EditablePopup 
				  			discardContactPopup={this.discardContactPopup.bind(this)}
				  			isEditing={false}
				  			submit={this.addContact.bind(this)}/>
  	} else if(this.state.isEditing === true) {
  		editablePopupUi = <EditablePopup 
				  			discardContactPopup={this.discardContactPopup.bind(this)}
				  			isEditing={true}
				  			submit={this.addContact.bind(this)}
				  			editingItemIndex={this.state.editingItemIndex}
				  			contactData={this.state.contactList[this.state.editingItemIndex]}
				  			submit={this.editContact.bind(this)}/>
  	}
    return (
      <div className="container">
      	<ul className="collection">
      		<li className="collection-header" >
				<span className="title" >Contact Manager</span>
				<a className="teal darken-1 waves-effect waves-circle btn-floating secondary-content"  onClick={this.openAddContact.bind(this)}>
					<i className="mdi-content-add" onClick={this.openAddContact.bind(this)} title="Add new contact">+</i>
				</a>
			</li>
			<ul>
				{contactListUi}
			</ul>
			{editablePopupUi}
      	</ul>

      </div>
    );
  }
}

export default ContactManger;
