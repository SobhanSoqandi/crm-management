import Modal from "../../components/UI/modal";


function Landing() {


  return (
    <div>
      <Modal>
        <Modal.Open name="payment">
          <button
            className="btn--mini  text-white"
          >

            <span>پرداخت</span>
          </button>
        </Modal.Open>


        <Modal.Window name="payment">
          <div className="p-6">
            <h2 className="text-lg font-bold">
              پرداخت
            </h2>

            <p>
              this is modal
            </p>

            <Modal.Close>
              <button className="mt-4 bg-gray-200 px-4 py-2 rounded">
                بستن
              </button>
            </Modal.Close>
          </div>
        </Modal.Window>

      </Modal>

    </div>
  );
}

export default Landing;