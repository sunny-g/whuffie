SignUp = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function() {
    return {
      username: '',
      password1: '',
      password2: ''
    };
  },

  openModal: function() {
    $('#signupModal').openModal();
  },

  closeModal: function () {
    $('#signupModal').closeModal();
  },

  /* from the docs, might be overkill if we dont need realtime updates
  handleChange: function(event) {
    console.log(event.target.value);
    this.setState({
      username: event.target.value
    })
  },
   */

  signupUser: function(event) {
    event.preventDefault();
    console.log('signed up', event);

    var username = this.refs.username.getDOMNode().value;
    var password1Node = this.refs.password1.getDOMNode();
    var password2Node = this.refs.password2.getDOMNode();
    var password1 = password1Node.value;
    var password2 = password2Node.value;
    console.log(password1, password2);

    if (password1 !== password2) {
      return;
    }

    this.closeModal();
    Accounts.createUser({
      username: username,
      password: password1
    }, function(err) {
      console.log('error:', err);
    });
  },

  render: function() {
    return (
      <span className="authButton container">
        {/* renders the modal trigger, a button */}
        <a
          className="authButton btn-large modal-trigger"
          href="#signupModal"
          onClick={this.openModal}>
          SIGNUP
        </a>

        {/* renders the modal */}
        <div id="signupModal" className="modal">
          <div className="modal-content">
            <form
              onSubmit={this.signupUser}
              onChange={this.handleChange}>
              <h4>Sign Up</h4>
              <input
                placeholder="username"
                type="text"
                ref="username"
              />
              <input
                placeholder="password"
                type="password"
                ref="password1"
              />
              <input
                placeholder="re-type password"
                type="password"
                ref="password2"
              />
              <input
                type="submit"
                className="authSubmit"
              />
            </form>
          </div>
        </div>
      </span>
    );
  }
});