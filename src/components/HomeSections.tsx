import React from 'react';
import type { Tool, Language } from '../types';
import { ToolCard } from './ToolCard';
import { trendingIds, allTools } from '../data/tools';
import { t } from '../data/i18n';

interface HomeSectionsProps {
  language: Language;
  favorites: string[];
  recent: string[];
  onToggleFav: (id: string, e: React.MouseEvent) => void;
  onSelectTool: (id: string) => void;
  onBrowseAll: () => void;
}

export const HomeSections: React.FC<HomeSectionsProps> = ({
  language,
  favorites,
  recent,
  onToggleFav,
  onSelectTool,
  onBrowseAll,
}) => {
  const trendingTools = trendingIds
    .map((id) => allTools.find((t) => t.id === id))
    .filter((t): t is Tool => Boolean(t));

  const favoriteTools = favorites
    .map((id) => allTools.find((t) => t.id === id))
    .filter((t): t is Tool => Boolean(t));

  const recentTools = recent
    .map((id) => allTools.find((t) => t.id === id))
    .filter((t): t is Tool => Boolean(t));

  const browseAllLabel =
    language === 'hi'
      ? `सभी ${allTools.length} टूल्स देखें →`
      : `Browse All ${allTools.length} Tools →`;

  return (
    <div id="homeView">
      {/* Popular Tools */}
      <div className="home-section">
        <div className="section-head">
          <h2>
            <span>{t('home.popularTools', language) || '⚡ Popular Tools'}</span>
          </h2>
          <button
            type="button"
            className="section-head-link"
            onClick={onBrowseAll}
          >
            <span>{t('home.viewAllTools', language) || 'View All Tools'}</span>{' '}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
        <div className="tool-grid">
          {trendingTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isFav={favorites.includes(tool.id)}
              language={language}
              onToggleFav={onToggleFav}
              onSelect={onSelectTool}
            />
          ))}
        </div>
      </div>

      {/* Favourite Tools */}
      <div className="home-section">
        <div className="section-head">
          <h2>{t('home.favoriteTools', language) || '⭐ Favourite Tools'}</h2>
        </div>
        <div className="tool-grid">
          {favoriteTools.length === 0 ? (
            <div className="recent-empty">
              {t('ui.noFavoritesText', language) || 'No favourite tools yet. Click the heart icon on any tool card to save it here.'}
            </div>
          ) : (
            favoriteTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFav={true}
                language={language}
                onToggleFav={onToggleFav}
                onSelect={onSelectTool}
              />
            ))
          )}
        </div>
      </div>

      {/* Recently Used */}
      <div className="home-section">
        <div className="section-head">
          <h2>{t('home.recentlyUsed', language) || '🕓 Recently Used'}</h2>
        </div>
        <div className="tool-grid">
          {recentTools.length === 0 ? (
            <div className="recent-empty">
              {t('ui.noRecentText', language) || 'No tools used recently yet. Open any tool and it will appear here for quick access.'}
            </div>
          ) : (
            recentTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFav={favorites.includes(tool.id)}
                language={language}
                onToggleFav={onToggleFav}
                onSelect={onSelectTool}
              />
            ))
          )}
        </div>
      </div>

      {/* Browse All CTA */}
      <div className="browse-all-wrap">
        <button
          className="btn-browse-all"
          id="browseAllBtn"
          type="button"
          onClick={onBrowseAll}
        >
          {browseAllLabel}
        </button>
      </div>

      {/* FAQ */}
      <div
        className="home-section"
        style={{ marginTop: 44, maxWidth: 760, marginLeft: 'auto', marginRight: 'auto' }}
      >
        <div className="section-head">
          <h2>{t('home.faqHeading', language) || '❓ Frequently Asked Questions'}</h2>
        </div>

        <div className="doc-card" style={{ marginBottom: 12, padding: 18, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-m)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
            {t('home.faq1q', language) || 'Is Toolkit Pro really free to use?'}
          </h3>
          <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: 14 }}>
            {t('home.faq1a', language) ||
              'Yes — every one of the 218+ tools is free, with no sign-up, no subscription, and no usage limit. The site is supported by ads rather than paid accounts.'}
          </p>
        </div>

        <div className="doc-card" style={{ marginBottom: 12, padding: 18, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-m)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
            {t('home.faq2q', language) || 'Does Toolkit Pro use AI?'}
          </h3>
          <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: 14 }}>
            {t('home.faq2a', language) ||
              'No. Every tool runs on deterministic, hand-written code — standard math, string operations, and browser APIs like Canvas and the Web Crypto API. Nothing here is generated or processed by an AI model.'}
          </p>
        </div>

        <div className="doc-card" style={{ marginBottom: 12, padding: 18, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-m)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
            {t('home.faq3q', language) || 'Is my data uploaded to a server?'}
          </h3>
          <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: 14 }}>
            {t('home.faq3a', language) ||
              'No — every tool runs entirely inside your own browser tab. Text, images, and files you use with a tool never leave your device or get sent anywhere.'}
          </p>
        </div>

        <div className="doc-card" style={{ marginBottom: 12, padding: 18, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-m)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
            {t('home.faq4q', language) || 'Do I need to create an account?'}
          </h3>
          <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: 14 }}>
            {t('home.faq4a', language) ||
              'No accounts, no logins, no email required for any tool. Your only optional saved data is a local "recently used tools" list and your theme choice, both stored in your own browser.'}
          </p>
        </div>

        <div className="doc-card" style={{ marginBottom: 12, padding: 18, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-m)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
            {t('home.faq5q', language) || 'Does it work on mobile?'}
          </h3>
          <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: 14 }}>
            {t('home.faq5a', language) ||
              'Yes — the site is fully responsive and every tool works the same way on a phone, tablet, or desktop browser.'}
          </p>
        </div>
      </div>
    </div>
  );
};
