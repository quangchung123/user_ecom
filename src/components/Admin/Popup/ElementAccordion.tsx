import React, {useState} from "react";

const ElementAccordion = ({item, children} : any) => {
    const [openAccordion, setOpenAccordion] = useState(false);

    const handleOpenAccordion = () => {
        setOpenAccordion(!openAccordion);
    }
    return (
        <div className="">
            <div
                className="w-full flex justify-between cursor-pointer h-12  bg-accent rounded-md  items-center px-2 text-white"
                onClick={handleOpenAccordion}>
                <div>
                    <span className={"bold"}>
                            {item.name}
                    </span>
                </div>
                <div>
                    <button>
                        {
                            !openAccordion ? <i className="bi bi-arrow-right-circle-fill  text-[20px]"></i> :
                                <i className="bi bi-arrow-down-circle-fill  text-[20px]"></i>
                        }
                    </button>
                </div>
            </div>
            {
                openAccordion && (
                    <div>
                        {children}
                    </div>
                )
            }
        </div>
    )
}
export default ElementAccordion;