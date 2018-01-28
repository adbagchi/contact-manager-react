import React, { Component } from 'react';


class ContactItem extends Component {

	onEdit() {
		this.props.openEditContact(this.props.contactIndex);
	}

	onRemove() {
		this.props.removeContact(this.props.contactIndex);
	}

  render() {
    return (
      <li key={this.props.contactIndex} className="collection-item avatar">
		<span className="title">{this.props.contact.name}</span>
		<p>
			<span>Phone Number: </span>
			<span>{this.props.contact.phoneNumber}</span>
			<span> </span>
			<br />
			<span>Email: </span>
			<span>{this.props.contact.email}</span>
		</p>
		<a className="remove-content darken-1 waves-effect waves-circle btn-floating secondary-content" onClick={this.onRemove.bind(this)}>
			<i title="Remove this contact">&#10006;</i>
		</a>
		<a className="edit-content darken-1 waves-effect waves-circle btn-floating secondary-content" onClick={this.onEdit.bind(this)}>
			<i title="Edit this contact">&#9997;</i>
		</a>
	</li>
    );
  }
}

export default ContactItem;
