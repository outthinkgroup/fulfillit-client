import React from "react";
import { useQuery, gql } from "@apollo/client";
import useModal from "../../../hooks/useModal";
import { useParams } from "react-router-dom";

// import useForm from "../../../hooks/useForm";
import getUrlParam from "../../../utils/getUrlParams";
// import { SINGLE_CAMPAIGN } from "../../CampaignForms/EditCampaign/EditCampaignForm";
import { Loader } from "../../../elements/Loader";
// import { Label } from "../../../elements/SingleForm";

const CAMPAIGN_INBOX_QUERY = gql`
  query CAMPAIGN_INBOX_QUERY($id: ID!) {
    campaign(id: $id, idType: ID) {
      id
      databaseId
      meta {
        id
        inbox {
          status
          message
          email
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export function CampaignInbox() {
  const {campaignId:id} = useParams()
  const {
    data: inboxData,
    loading: inboxLoading,
    error: inboxError,
  } = useQuery(CAMPAIGN_INBOX_QUERY, {
    variables: {
      id, 
    },
  });

  if (inboxError) {
    return <p>{inboxError.message}</p>;
  }
  if (inboxLoading) {
    return <Loader />;
  }

  const entries = inboxData.campaign.meta.inbox;

  return (
    <div>
      <table className="w-full table-auto overflow-hidden rounded border border-slate-100 text-left shadow">
        <thead className="bg-blue-200">
          <tr>
            <Th>Date</Th>
            <Th>Email</Th>
            <Th className="text-center">Status</Th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <Tr entry={entry} key={entry.createdAt}>
              <Td className="px-1 py-3 text-black">
                {fmtDate(entry.createdAt)}
              </Td>
              <Td className="px-1 py-3">{entry.email}</Td>
              <Td className="px-1 py-3 text-center">
                <span
                  className={`mx-auto flex w-full justify-center text-center ${
                    entry.status == 200 ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {entry.status == 200 ? <Checkmark /> : <Xmark />}
                </span>
              </Td>
            </Tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Tr = ({ entry, children }) => {
  const { modal: Modal, setIsOpen, isOpen } = useModal();
  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <tr
        onClick={openModal}
        className={`bg-white even:bg-gray-100 hover:shadow-lg ${
          !isOpen ? "hover:z-10" : ""
        }`}
      >
        {children}
      </tr>
      <Modal>
        <header className="mb-10 flex items-center gap-6">
          <h3 className="text-2xl font-bold text-blue-600">{entry.email}</h3>
          <a
            href={`mailto:${entry.email}`}
            target="_blank"
            className="rounded bg-blue-100 py-2 px-4 text-sm font-medium capitalize text-blue-600 hover:bg-blue-200"
          >
            message
          </a>
        </header>
        <div className="flex flex-col gap-4">
          <div>
            <h4 className="text-sm">Date Added:</h4>
            <p className="font-bold tracking-wide">
              {fmtDate(entry.createdAt)}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-sm">Message</h4>
            <p className="rounded-md bg-blue-50 p-4 py-4 text-blue-900">
              {entry.message}
            </p>
          </div>
        </div>
        {entry.status != 200 ? (
          <footer className="mt-10 border-t border-blue-50 p-2">
            <div className="flex items-center justify-between">
              <p className="text-md">Mark resolved?</p>
              <button>Resolve</button>
            </div>
          </footer>
        ) : null}
      </Modal>
    </>
  );
};

const Th = ({ children, className }) => {
  return (
    <th className={`border-collapse  px-5 py-3 text-blue-900 ${className}`}>
      {children}
    </th>
  );
};

const Td = ({ children, className }) => {
  return (
    <td
      className={`border-collapse border border-slate-100 px-5 py-5 text-blue-900 ${className}`}
    >
      {children}
    </td>
  );
};

function Checkmark() {
  return (
    <svg
      className="aspect-square w-4 fill-current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
    </svg>
  );
}
function Xmark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="aspect-square w-4 fill-current"
      viewBox="0 0 512 512"
    >
      <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
    </svg>
  );
}

function fmtDate(seconds) {
  seconds = parseInt(seconds);
  const date = new Date(seconds * 1000);
  return date.toLocaleDateString();
}
