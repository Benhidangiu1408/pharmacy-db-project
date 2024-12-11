import React from "react";

const Form = () => {
  return (
    <form>
      <div className="row mb-3 ml-5">
        <label
          htmlFor="inputEmail3"
          className="col-sm-2 col-form-label ml-[90px] mr-[1px]"
        >
          Email
        </label>
        <div className="col-sm-7 ">
          <input
            type="email"
            className="form-control border border-black"
            id="inputEmail3"
          />
        </div>
      </div>
      <div className="row mb-3">
        <label
          htmlFor="inputPassword3"
          className="col-sm-2 col-form-label ml-[90px] mr-[1px]"
        >
          Password
        </label>
        <div className="col-sm-7">
          <input
            type="password"
            className="form-control border border-black"
            id="inputPassword3"
          />
        </div>
      </div>
      <div className="row mb-3">
        <label
          htmlFor="sl"
          className="col-sm-2 col-form-label ml-[90px] mr-[1px]"
        >
          SL
        </label>
        <div className="col-sm-7">
          <input
            type="number"
            className="form-control border border-black"
            id="sl"
          />
        </div>
      </div>
      <fieldset className="row mb-3">
        <legend className="col-form-label col-sm-2 pt-0 ml-[90px] mr-[1px]">
          Radios
        </legend>
        <div className="col-sm-7">
          <div className="form-check">
            <input
              className="form-check-input border border-black"
              type="radio"
              name="gridRadios"
              id="gridRadios1"
              value="option1"
              checked
            />
            <label className="form-check-label " htmlFor="gridRadios1">
              First radio
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input border border-black"
              type="radio"
              name="gridRadios"
              id="gridRadios2"
              value="option2"
            />
            <label className="form-check-label " htmlFor="gridRadios2">
              Second radio
            </label>
          </div>
          <div className="form-check disabled">
            <input
              className="form-check-input border border-black"
              type="radio"
              name="gridRadios"
              id="gridRadios3"
              value="option3"
              disabled
            />
            <label className="form-check-label " htmlFor="gridRadios3">
              Third disabled radio
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset className="row mb-3">
        <legend className="col-form-label col-sm-2 pt-0 ml-[90px] mr-[1px]">
          Radios
        </legend>
        <div className="col-sm-7">
          <select
            className="form-select form-select-[5px] mb-3 border border-black"
            aria-label="Small select example"
          >
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </fieldset>
      <div className="row mb-3 ml-36">
        <legend className="col-form-label col-sm-2 pt-0 ml-[90px] mr-[1px]"></legend>
        <div className="col-sm-7">
          <div className="form-check">
            <input
              className="form-check-input border border-black "
              type="checkbox"
              id="gridCheck1"
            />
            <label className="form-check-label" htmlFor="gridCheck1">
              Example checkbox
            </label>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary ml-[80px]">
        Sign in
      </button>
    </form>
  );
};

export default Form;
