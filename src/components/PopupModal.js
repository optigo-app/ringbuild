import React from 'react';
import { Modal } from 'react-bootstrap';

function PopupModal({ show, hide, designNo, metalColor }) {
  return (
    <>
      <Modal show={show} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title className='fw-bold'>3D Smart Jewel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            title="Embedded Content"
            // src={`https://bestcustomjewelers.com/?a=${designNo}&b=${metalColor}`}
            src={`https://view3d.optigoapps.com/?a=${designNo}&b=${metalColor}`}
            // src={`http://optigoone.com/?a=${designNo}&b=${metalColor}`}
            // src={`http://zen/r50b3/3d?a=3Dviewer&b=${designNo}`}
            className='w-100 popupModal3D'
          ></iframe>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default PopupModal;