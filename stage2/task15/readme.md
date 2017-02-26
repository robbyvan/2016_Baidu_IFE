#Form Validation

## Validation Form


##Syntax
``  
    var vf = new VForm(config, parentDomId);
    @param {Object} config
    @param {String} parentDomId
``

##Examples
``
config: {
  fieldName: config.fieldName || "username";      //new field name
  placeholder: config.placeholder || "username";  //placeholder of the input
  checkType: config.checkType || 'username';      // username, password, email, phone
  rule: config.rule || 'Username shoud be no longer than 20';   //Hint about the format of this field
  minLength: config.minLength || 1;               //minimum length
  maxLength: config.maxLength || 20;              //maximum length
}
``
``
parentDomId : The destionation of the new VForm
``

``
const VF1 = new VForm({}, 'validation-form'); //Default: username
const VF2 = new VForm({fieldName: 'password', placeholder: 'password', checkType: 'password'}, 'validation-form');
const VF3 = new VForm({fieldName: 'password2', placeholder: 'password again', checkType:'password2'}, 'validation-form');
const VF4 = new VForm({fieldName: 'email', placeholder: 'email', checkType:'email'}, 'validation-form');
const VF5 = new VForm({fieldName: 'telephone', placeholder: 'telephone', checkType:'telephone'}, 'validation-form');
``
