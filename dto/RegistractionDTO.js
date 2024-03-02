class registration {
    constructor(email_id, first_name, last_name, phone_number, password, confirm_password, access_level){
        this.email_id = email_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.password = password;
        this.confirm_password = confirm_password;
        this.access_level = access_level

    }
}

module.exports = {registration};