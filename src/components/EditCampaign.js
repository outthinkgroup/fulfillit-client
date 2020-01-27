import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import CampaignDetails from "./CampaignDetails"
import useForm from "../utils/useForm"
import Icon from "../elements/Icon"
import { FORM_DEFAULT_STATE } from "./NewCampaignWizard"

const EditCampaign = ({ className }) => {
  const campaign = {
    id: 3,
    dateCreated: "5/30/2027",
    settings: {
      name: "third Campaign",
      email: "book@mg.taskcannon.co",
      service: "Mailchimp",
    },
  }

  const formFields = {
    name: "",
    email: "",
    service: "",

    mailchimpApiKey: "",
    mailchimpListId: "",
    mailchimpGroupId: "",

    singleEmailSubject: "",
    singleEmailBody: "",
    singleEmailAttachment: "",
  }

  const [form, updateForm] = useForm({
    ...Object.assign(formFields, campaign.settings),
  })
  return (
    <form className={className}>
      <CampaignDetails form={form} updateForm={updateForm} />
      <div className="bottom-bar">
        <div>
          <input type="submit" value="save" className="save" />
          <Link to="/dashboard">
            <a className="btn cancel">cancel</a>
          </Link>
        </div>
      </div>
    </form>
  )
}

export default styled(EditCampaign)`
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  background: #fff;
  overflow-y: scroll;
  z-index: 10;
  box-shadow: ${({ theme }) => theme.depth.high};
  padding-top: 0;
  .bottom-bar {
    z-index: 12;
    border-top: 1px solid #efefef;
    background: white;
    position: fixed;
    bottom: 0;
    width: 400px;
    & > div {
      padding: 10px;
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
    }
    .save,
    .cancel {
      margin-right: 10px;
      margin-top: 0;
      text-align: center;
      padding: 11px 15px;
      width: 150px;
    }
    .save {
      border: 2px solid ${({ theme }) => theme.colors.primary};
    }
    .cancel {
      background: ${({ theme }) => theme.colors.warning.light};
      color: ${({ theme }) => theme.colors.warning.dark};
      border: 2px solid ${({ theme }) => theme.colors.warning.dark};
    }
  }
  ${CampaignDetails} {
    padding: 20px;
    padding-bottom: 80px;
  }
`
