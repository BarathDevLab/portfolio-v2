"use client";
import React from "react";
import dynamic from "next/dynamic";
import { GitCommit, ExternalLink } from "lucide-react";

// Dynamic import required - react-github-calendar uses window
const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

interface GitHubActivityProps {
  username?: string;
}

const GitHubActivity: React.FC<GitHubActivityProps> = ({
  username = "BarathDevLab",
}) => {
  const customTheme = {
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <GitCommit className="text-green-400" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">GitHub Activity</h3>
            <p className="text-xs text-gray-500">@{username}</p>
          </div>
        </div>
        
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
        >
          View Profile
          <ExternalLink size={14} />
        </a>
      </div>

      {/* Calendar - with hidden scrollbar */}
      <div 
        className="overflow-x-auto pb-1"
        style={{
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none', /* IE/Edge */
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <GitHubCalendar
          username={username}
          colorScheme="dark"
          theme={customTheme}
          fontSize={11}
          blockSize={11}
          blockMargin={3}
          labels={{
            totalCount: "{{count}} contributions in the last year",
          }}
        />
      </div>
    </div>
  );
};

export default GitHubActivity;
