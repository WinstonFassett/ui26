import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { BlockPreview } from "@/components/BlockPreview";
import type { Spec } from "@json-render/core";

// Import sample specs directly (webpack doesn't support import.meta.glob)
import ticketCard from "@/samples/ticket-card.sample";
import statsCard from "@/samples/stats-card.sample";
import kpiStrip from "@/samples/kpi-strip.sample";
import signInForm from "@/samples/sign-in-form.sample";
import activityFeed from "@/samples/activity-feed.sample";
import commandPalette from "@/samples/command-palette.sample";
import chatThread from "@/samples/chat-thread.sample";
import aiMessage from "@/samples/ai-message.sample";
import alertGallery from "@/samples/alert-gallery.sample";
import progressCard from "@/samples/progress-card.sample";
import onboardingCard from "@/samples/onboarding-card.sample";
import accordionCard from "@/samples/accordion-card.sample";
import notificationList from "@/samples/notification-list.sample";
import ticketTable from "@/samples/ticket-table.sample";
import machineStats from "@/samples/machine-stats.sample";
import tixIssueList from "@/samples/tix-issue-list.sample";
import upgradeCard from "@/samples/upgrade-card.sample";
import emptyState from "@/samples/empty-state.sample";
import breadcrumbNav from "@/samples/breadcrumb-nav.sample";
import paginationBar from "@/samples/pagination-bar.sample";
import badgeCompositions from "@/samples/badge-compositions.sample";
import avatarRow from "@/samples/avatar-row.sample";
import tooltipCard from "@/samples/tooltip-card.sample";
import workspaceForm from "@/samples/workspace-form.sample";

const clampOpts = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

// ---------------------------------------------------------------------------
// A tiny deterministic bar chart (used by the Move Goal card here and by the
// Charts beat in the category montage).
// ---------------------------------------------------------------------------
export const MiniBars: React.FC<{
  values: number[];
  height: number;
  barWidth?: number;
  gap?: number;
  color?: string;
  stagger?: number;
}> = ({ values, height, barWidth = 14, gap = 8, color = "#52525b", stagger = 2 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const max = Math.max(...values);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap, height }}>
      {values.map((v, i) => {
        const grow = spring({
          frame: frame - i * stagger,
          fps,
          config: { damping: 14, stiffness: 120, mass: 0.8 },
        });
        return (
          <div
            key={i}
            style={{
              width: barWidth,
              height: Math.max(3, (v / max) * height * grow),
              borderRadius: 4,
              background: color,
            }}
          />
        );
      })}
    </div>
  );
};

// ---------------------------------------------------------------------------
// The component field — real ui26 examples rendered from JSON Render specs.
// ---------------------------------------------------------------------------
const FIELD_SPECS: { id: string; spec: Spec; spanFull: boolean }[] = [
  ticketCard, statsCard, kpiStrip, signInForm, activityFeed,
  commandPalette, chatThread, aiMessage, alertGallery, progressCard,
  onboardingCard, accordionCard, notificationList, ticketTable, machineStats,
  tixIssueList, upgradeCard, emptyState, breadcrumbNav, paginationBar,
  badgeCompositions, avatarRow, tooltipCard, workspaceForm,
].map((s: any) => ({ id: s.id, spec: s.spec, spanFull: s.span === "full" }));

// ---------------------------------------------------------------------------
// Camera: one continuous diagonal glide across the packed wall.
// ---------------------------------------------------------------------------
const PLANE_W = 1720;
const PLANE_H = 2400;

const CAM_T = [0, 224];
const CAM_X = [520, 1180];
const CAM_Y = [300, 1300];
const CAM_S = [1.02, 1.1];

const camEasing = Easing.inOut(Easing.cubic);

export const FieldScene: React.FC = () => {
  const frame = useCurrentFrame();

  const px = interpolate(frame, CAM_T, CAM_X, { ...clampOpts, easing: camEasing });
  const py = interpolate(frame, CAM_T, CAM_Y, { ...clampOpts, easing: camEasing });
  const s = interpolate(frame, CAM_T, CAM_S, { ...clampOpts, easing: camEasing });
  const rotate = interpolate(frame, [0, 224], [-1.0, 0.4], clampOpts);

  const tx = 640 - px * s;
  const ty = 360 - py * s;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `rotate(${rotate}deg)` }}>
        <div
          data-theme="editorial-dark"
          className="**:font-normal!"
          style={{
            fontFamily: '"Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
            position: "absolute",
            width: PLANE_W,
            transform: `translate(${tx}px, ${ty}px) scale(${s})`,
            transformOrigin: "0 0",
          }}
        >
          <div className="columns-6 gap-5 p-5">
            {FIELD_SPECS.map((item, i) => {
              const d = 2 + i * 5;
              const enter = interpolate(frame, [d, d + 12], [0, 1], {
                ...clampOpts,
                easing: Easing.out(Easing.cubic),
              });
              return (
                <div
                  key={item.id}
                  className="mb-5 break-inside-avoid border border-border bg-card p-4 overflow-hidden"
                  style={{
                    opacity: enter,
                    transform: `translateY(${(1 - enter) * 22}px) scale(${
                      0.97 + enter * 0.03
                    })`,
                  }}
                >
                  <BlockPreview spec={item.spec} />
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export { PLANE_H };
export const S_FIELD = 224;
