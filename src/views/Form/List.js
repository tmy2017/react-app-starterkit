import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Link } from "react-router-dom";
import {
  indexForms,
  selectRoot,
  selectError,
  Errors,
  FormGrid
} from "react-formio";
import Loading from "../../containers/Loading";

const List = class extends Component {
  componentWillMount() {
    this.props.getForms(1);
  }

  render() {
    const { forms, onAction, getForms, errors } = this.props;

    if (forms.isActive) {
      return <Loading />;
    }

    return (
      <div>
        <h1>Forms</h1>
        <Errors errors={errors} />
        {/* 🚨zzcore! ((⚪️ zzp._15._y20.0407-0750)) */}
        <FormGrid forms={forms} onAction={onAction} getForms={getForms} />
        <Link className="btn btn-primary" to="/form/create">
          <i className="fa fa-plus" /> Create Form
        </Link>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    forms: selectRoot("forms", state),
    errors: selectError("forms", state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getForms: (page, query) => {
      // ❓what is this *action* indexForms? ((zzQ ((⚪️ zzp._15._y20.0407-0755
      //    zzRef - https://github.com/formio/react-formio/blob/3b408402bf049a8365d47600a064a88701ad423d/src/modules/forms/actions.js#L31
      // has more argument than getForm: () => dispatch(getForm("event")) (at Event/List.js)
      //    zzRef - https://github.com/formio/react-formio#props-4
      //          - https://github.com/formio/react-formio#actions-2
      dispatch(indexForms("forms", page, query));
    },
    onAction: (form, action) => {
      switch (action) {
        case "view":
          dispatch(push(`/form/${form._id}`));
          break;
        // 🚨 should be here zzsubmission control ((⚪️ zzp._15._y20.0407-0752 ))
        // so the form is zzdynamic! compare to Event/List.js
        case "submission":
          dispatch(push(`/form/${form._id}/submission`));
          break;
        case "edit":
          dispatch(push(`/form/${form._id}/edit`));
          break;
        case "delete":
          dispatch(push(`/form/${form._id}/delete`));
          break;
        default:
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
