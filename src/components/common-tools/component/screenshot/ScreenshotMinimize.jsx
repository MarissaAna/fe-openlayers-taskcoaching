/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Tuesday, June 11th 2024, 8:00:22 am
 * Author: Febrina Qoonitah | febrina231@gmail.com <https://gitea.len-iot.id/febrina.qoonitah.e>
 * Co-Author: Jody Yuantoro | jodyyuan@xyzuan.my.id <https://gitea.len-iot.id/jody.yuantoro.e>
 *
 */

import React, { useContext } from "react";
import {
  MdOutlineScreenshotMonitor,
  MdOutlineTabUnselected,
} from "react-icons/md";
import { TbSquarePlus2 } from "react-icons/tb";
import MoveableModal from "../../common/components/MoveableModal";
import { FaRegWindowMaximize } from "react-icons/fa";
import { ScreenshotContext } from "./context/ScreenshotContext";
import useFlash from "../../hooks/useFlash";

const ScreenshotMinimizeItem = ({
  takeScreenshot,
  maximizeScreenshot,
  onClose,
  setActiveTab,
}) => {
  const { showFlash } = useFlash();

  /**
   * Function to handle tab click event.
   * @param {number} index - Index of the clicked tab
   */
  const handleTabClick = async (index) => {
    if (index === 1) {
      await takeScreenshot(
        index,
        {
          timerId: "timer-modal",
          stopwatchId: "stopwatch-modal",
          calculatorId: "calculator-modal",
        },
        () => {
          showFlash();
          setActiveTab(index);
          maximizeScreenshot();
        }
      );
    } else {
      onClose();
      takeScreenshot(index, {}, () => {
        showFlash();
        onClose();
        setActiveTab(index);
        maximizeScreenshot();
      });
    }
  };

  return (
    <div
      data-testid="screenshot-minimize"
      className="flex justify-center align-items-center m-1"
    >
      <div className="bg-[#242A26] px-2 py-1 rounded-xl">
        <button
          data-testid="fullscreen-btn"
          className="hover:bg-btn-secondary p-2 rounded-md "
          onClick={() => handleTabClick(0)}
          title="Screenshot Fullscreen"
        >
          <MdOutlineScreenshotMonitor size={24} />
        </button>
        <button
          data-testid="window-btn"
          className="hover:bg-btn-secondary p-2 rounded-md"
          onClick={() => handleTabClick(1)}
          title="Screenshot Window"
        >
          <TbSquarePlus2 size={24} />
        </button>
        <button
          data-testid="area-btn"
          className="hover:bg-btn-secondary p-2 rounded-md"
          onClick={() => handleTabClick(2)}
          title="Screenshot Area"
        >
          <MdOutlineTabUnselected size={24} />
        </button>
      </div>
    </div>
  );
};

const ScreenshotMinimize = ({ onClose, show, maximizeScreenshot }) => {
  const { takeScreenshot, handleActiveMode } = useContext(ScreenshotContext);

  return (
    <MoveableModal
      data-testid="screenshot-modal"
      className="bg-bg3-100 p-0"
      title={
        <ScreenshotMinimizeItem
          takeScreenshot={takeScreenshot}
          maximizeScreenshot={maximizeScreenshot}
          onClose={onClose}
          setActiveTab={handleActiveMode}
        />
      }
      action={
        <button
          data-testid="maximize-button"
          className="p-2 hover:bg-bg1-100 rounded-md"
          onClick={maximizeScreenshot}
          title="Maximize"
        >
          <FaRegWindowMaximize size={22} />
        </button>
      }
      onClose={onClose}
      show={show}
    />
  );
};

export default ScreenshotMinimize;
