import SearchInput from "../../components/UI/SearchInput";
import AppointmentDateSelector from "./calendar/AppointmentDateSelector";
import { PlusIcon } from "lucide-react";
import Modal from "../../components/UI/modal";
import AddAppointmentForm from "./addapoint/AddAppointmentForm";


function HeaderAppoint({ phone, onPhoneChange, startDate, onStartDateChange , isSalon }) {

  return (
    <div className="md:flex justify-between space-y-5 md:space-y-0 mx-3">
      <div className="flex gap-2 items-center">
        <AppointmentDateSelector value={startDate} onChange={onStartDateChange} />
      </div>

      {
        isSalon ?
          <div className="flex justify-between items-center sm:w-[450px] md:w-[350px] lg:w-[450px] gap-2">
            <div className="w-full">
              <SearchInput value={phone} onChange={onPhoneChange} />
            </div>
            <div>

              <Modal>
                <Modal.Open>
                  <button className="btn btn--gold flex gap-2 text-nowrap">
                    <PlusIcon className="w-4 sm:w-6 shrink-0" />
                    افزودن نوبت
                  </button>
                </Modal.Open>
                <Modal.Window>
                  <AddAppointmentForm />
                </Modal.Window>
              </Modal>

            </div>
          </div>
          :
          ""
      }
    </div>
  );
}

export default HeaderAppoint;