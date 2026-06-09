import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  FaCalculator,
  FaTag,
  FaCheck,
  FaExclamationTriangle,
  FaWhatsapp,
  FaEnvelope,
  FaClock,
  FaFileUpload,
  FaTruck,
  FaInfoCircle,
  FaFire,
  FaChevronDown,
} from 'react-icons/fa';
import { calculatorData, calculerPrix, CalcResult } from '../calculatorData';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  return n.toLocaleString('fr-MA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface SelectFieldProps {
  label: string;
  icon: React.ReactNode;
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, icon, id, value, onChange, options, disabled }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
      <span className="text-aria-accent">{icon}</span>
      {label}
    </label>
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full appearance-none px-4 py-3.5 pr-10 rounded-xl border-2 font-semibold text-gray-800 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-aria-accent/40 focus:border-aria-accent ${
          disabled
            ? 'opacity-50 cursor-not-allowed border-gray-200'
            : 'border-gray-200 hover:border-aria-accent cursor-pointer shadow-sm'
        }`}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const PriceCalculator: React.FC = () => {
  // ── State ──
  const firstProduit = calculatorData.produits[0];

  const [produitId, setProduitId] = useState<string>(firstProduit.id);
  const [mode, setMode] = useState<string>('');
  const [grammage, setGrammage] = useState<string>('');
  const [quantiteStr, setQuantiteStr] = useState<string>('');
  const [souche, setSouche] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [result, setResult] = useState<CalcResult | null>(null);
  const [animKey, setAnimKey] = useState<number>(0);

  // ── Derived data ──
  const produit = useMemo(
    () => calculatorData.produits.find(p => p.id === produitId) || calculatorData.produits[0],
    [produitId]
  );

  const isCarnet = produit.type === 'carnet';

  // Available quantities
  const quantites = useMemo(() => {
    if (isCarnet) {
      if (!souche || !produit.tarifsCarnets) return [];
      return Object.keys(produit.tarifsCarnets[souche] || {});
    } else {
      if (!mode || !grammage || !produit.tarifs) return [];
      return Object.keys(produit.tarifs[mode]?.[grammage] || {});
    }
  }, [isCarnet, produit, souche, mode, grammage]);

  // Available options for this product
  const availableOptions = useMemo(() => {
    return Object.entries(calculatorData.options_finitions).filter(([, opt]) => {
      if (!opt.applicable_a) return true;
      return opt.applicable_a.includes(produitId);
    });
  }, [produitId]);

  // ── Init defaults on product change ──
  const initDefaults = useCallback((pid: string) => {
    const p = calculatorData.produits.find(x => x.id === pid);
    if (!p) return;
    setSelectedOptions([]);
    if (p.type === 'carnet') {
      const firstSouche = p.souches?.[0] || '';
      setSouche(firstSouche);
      setMode('');
      setGrammage('');
      const firstQty = Object.keys(p.tarifsCarnets?.[firstSouche] || {})[0] || '';
      setQuantiteStr(firstQty);
    } else {
      const firstMode = p.modes?.[0] || '';
      setMode(firstMode);
      const firstGrammage = p.grammages?.[0] || '';
      setGrammage(firstGrammage);
      const firstQty = Object.keys(p.tarifs?.[firstMode]?.[firstGrammage] || {})[0] || '';
      setQuantiteStr(firstQty);
      setSouche('');
    }
  }, []);

  useEffect(() => {
    initDefaults(produitId);
  }, [produitId, initDefaults]);

  // Re-sync quantite when mode/grammage/souche changes
  useEffect(() => {
    if (quantites.length > 0 && !quantites.includes(quantiteStr)) {
      setQuantiteStr(quantites[0]);
    }
  }, [quantites, quantiteStr]);

  // ── Compute result ──
  useEffect(() => {
    if (!quantiteStr) { setResult(null); return; }
    const r = calculerPrix(produitId, quantiteStr, grammage, mode, souche, selectedOptions);
    setResult(r);
    setAnimKey(k => k + 1);
  }, [produitId, quantiteStr, grammage, mode, souche, selectedOptions]);

  // ── Option toggle ──
  const toggleOption = (optName: string) => {
    setSelectedOptions(prev =>
      prev.includes(optName) ? prev.filter(o => o !== optName) : [...prev, optName]
    );
  };

  // ── Quote request (WhatsApp) ──
  const handleQuoteRequest = () => {
    const lines = [
      `📋 *Demande de devis — Imprimerie Aria*`,
      ``,
      `• Produit : *${produit.nom}* (${produit.format})`,
      isCarnet ? `• Souches : ${souche}` : `• Mode : ${mode}`,
      !isCarnet ? `• Grammage : ${grammage}` : '',
      `• Quantité : ${parseInt(quantiteStr, 10).toLocaleString('fr-MA')} ex.`,
      selectedOptions.length > 0 ? `• Options : ${selectedOptions.join(', ')}` : '',
      ``,
      result && !result.erreur
        ? `💰 Prix estimé HT : *${fmt(result.prixHT)} dh*\n   Prix TTC : *${fmt(result.prixTTC)} dh*`
        : '',
    ].filter(Boolean).join('\n');

    const phone = '212528304000';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(lines)}`;
    window.open(url, '_blank');
  };

  const handleEmailRequest = () => {
    const subject = encodeURIComponent(`Devis — ${produit.nom}`);
    const lines = [
      `Demande de devis — Imprimerie Aria`,
      ``,
      `Produit : ${produit.nom} (${produit.format})`,
      isCarnet ? `Souches : ${souche}` : `Mode : ${mode}`,
      !isCarnet ? `Grammage : ${grammage}` : '',
      `Quantité : ${parseInt(quantiteStr, 10).toLocaleString('fr-MA')} ex.`,
      selectedOptions.length > 0 ? `Options : ${selectedOptions.join(', ')}` : '',
      ``,
      result && !result.erreur
        ? `Prix estimé HT : ${fmt(result.prixHT)} dh\nPrix TTC : ${fmt(result.prixTTC)} dh`
        : '',
    ].filter(Boolean).join('\n');
    const body = encodeURIComponent(lines);
    window.location.href = `mailto:imprimerie.aria@gmail.com?subject=${subject}&body=${body}`;
  };

  // ── Quantity label helper ──
  const qtyLabel = (q: string) => {
    const n = parseInt(q, 10);
    if (isNaN(n)) return q;
    return `${n.toLocaleString('fr-MA')} ex.`;
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-5xl mx-auto">
      {/* ── Hero Header ── */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-aria-primary to-aria-accent text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg mb-4">
          <FaCalculator className="text-base" />
          Calculateur de Prix Instantané
        </div>
        <p className="text-gray-500 font-open-sans text-sm max-w-xl mx-auto">
          Sélectionnez votre produit et vos options — le prix s'affiche <strong>en temps réel</strong>, sans rechargement.
        </p>
      </div>

      {/* ── Main Card ── */}
      <div className="bg-white rounded-3xl shadow-2xl shadow-aria-primary/10 border border-gray-100 overflow-hidden">

        {/* ── Form Section ── */}
        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 border-b border-gray-100">

          {/* 1. Produit */}
          <SelectField
            id="calc-produit"
            label="1. Produit"
            icon={<FaTag />}
            value={produitId}
            onChange={setProduitId}
            options={calculatorData.produits.map(p => ({ value: p.id, label: `${p.nom} — ${p.format}` }))}
          />

          {/* 2. Mode (flyers/dépliants) ou Souches (carnets) */}
          {isCarnet ? (
            <SelectField
              id="calc-souche"
              label="2. Nombre de Souches"
              icon={<FaFileUpload />}
              value={souche}
              onChange={setSouche}
              options={(produit.souches || []).map(s => ({ value: s, label: s }))}
            />
          ) : (
            <SelectField
              id="calc-mode"
              label="2. Mode d'impression"
              icon={<FaFileUpload />}
              value={mode}
              onChange={v => { setMode(v); }}
              options={(produit.modes || []).map(m => ({ value: m, label: m }))}
            />
          )}

          {/* 3. Grammage (flyers/dépliants only) */}
          {!isCarnet && (
            <SelectField
              id="calc-grammage"
              label="3. Grammage / Papier"
              icon={<FaInfoCircle />}
              value={grammage}
              onChange={setGrammage}
              options={(produit.grammages || []).map(g => ({ value: g, label: g }))}
            />
          )}

          {/* 4. Quantité */}
          <SelectField
            id="calc-quantite"
            label={isCarnet ? '3. Quantité' : '4. Quantité'}
            icon={<FaTruck />}
            value={quantiteStr}
            onChange={setQuantiteStr}
            options={quantites.map(q => ({ value: q, label: qtyLabel(q) }))}
            disabled={quantites.length === 0}
          />

          {/* 5. Options & Finitions (full width) */}
          {availableOptions.length > 0 && (
            <div className="lg:col-span-2 space-y-3">
              <p className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                <span className="text-aria-accent"><FaCheck /></span>
                {isCarnet ? '4.' : '5.'} Options & Finitions
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {availableOptions.map(([optName, optData]) => {
                  const isSelected = selectedOptions.includes(optName);
                  const isSurDevis = optData.prix_par_1000 === null;
                  return (
                    <label
                      key={optName}
                      htmlFor={`opt-${optName}`}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'border-aria-accent bg-aria-accent/5 shadow-md'
                          : 'border-gray-200 bg-gray-50 hover:border-aria-accent/50 hover:bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        id={`opt-${optName}`}
                        checked={isSelected}
                        onChange={() => toggleOption(optName)}
                        className="mt-0.5 w-4 h-4 accent-aria-accent flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-sm font-semibold text-gray-800 leading-tight block">{optName}</span>
                        <span className={`text-xs font-bold mt-0.5 block ${isSurDevis ? 'text-orange-500' : 'text-aria-accent'}`}>
                          {isSurDevis
                            ? 'Sur devis'
                            : `+${optData.prix_par_1000} dh / 1 000 ex.`}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ── Result Section ── */}
        <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50/30">

          {/* Promo Banner */}
          {result?.estPromo && result.promoLabel && (
            <div
              key={`promo-${animKey}`}
              className="mb-6 flex items-center gap-3 bg-gradient-to-r from-red-500 via-rose-500 to-red-500 text-white p-4 rounded-2xl shadow-lg shadow-red-500/20 animate-fade-in-up"
            >
              <FaFire className="text-2xl flex-shrink-0 animate-pulse" />
              <div>
                <p className="font-extrabold text-base leading-snug">{result.promoLabel}</p>
                <p className="text-red-100 text-xs mt-0.5">Prix promotionnel appliqué automatiquement ✓</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {result?.erreur && (
            <div className="mb-6 flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-2xl">
              <FaExclamationTriangle className="text-amber-500 text-xl flex-shrink-0" />
              <p className="font-semibold text-sm">{result.erreur}</p>
            </div>
          )}

          {/* Sur-Devis Warning */}
          {result?.surDevis && result.surDevis.length > 0 && (
            <div className="mb-6 flex items-center gap-3 bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-2xl">
              <FaInfoCircle className="text-orange-500 text-xl flex-shrink-0" />
              <p className="text-sm font-medium">
                Les options suivantes nécessitent un devis personnalisé :{' '}
                <strong>{result.surDevis.join(', ')}</strong>
              </p>
            </div>
          )}

          {/* Price Breakdown */}
          {result && !result.erreur && (
            <div key={`result-${animKey}`} className="animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                {/* Left: price breakdown */}
                <div className="space-y-3">
                  {/* Prix de base */}
                  <div className="flex justify-between items-center p-3.5 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <span className="text-sm text-gray-500 font-semibold flex items-center gap-2">
                      <span>💰</span> Prix de base
                    </span>
                    <span className="font-bold text-gray-800">{fmt(result.prixBase)} dh</span>
                  </div>

                  {/* Options */}
                  <div className="flex justify-between items-center p-3.5 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <span className="text-sm text-gray-500 font-semibold flex items-center gap-2">
                      <span>✨</span> Options
                    </span>
                    <span className={`font-bold ${result.prixOptions > 0 ? 'text-aria-accent' : 'text-gray-400'}`}>
                      +{fmt(result.prixOptions)} dh
                    </span>
                  </div>

                  {/* Prix HT */}
                  <div className="flex justify-between items-center p-3.5 bg-aria-primary/5 rounded-xl border border-aria-primary/20">
                    <span className="text-sm text-aria-primary font-bold flex items-center gap-2">
                      <span>📦</span> Prix HT
                    </span>
                    <span className="font-extrabold text-aria-primary text-lg">{fmt(result.prixHT)} dh</span>
                  </div>

                  {/* TVA */}
                  <div className="flex justify-between items-center p-3.5 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <span className="text-sm text-gray-500 font-semibold flex items-center gap-2">
                      <span>🏷️</span> TVA (20%)
                    </span>
                    <span className="font-bold text-gray-600">{fmt(result.TVA)} dh</span>
                  </div>
                </div>

                {/* Right: TTC hero price */}
                <div className="flex flex-col items-center justify-center bg-gradient-to-br from-aria-primary to-aria-accent rounded-2xl p-6 text-white shadow-xl shadow-aria-primary/20 text-center">
                  <p className="text-blue-200 text-xs uppercase tracking-widest font-bold mb-1">Prix Total TTC</p>
                  <p className="text-4xl md:text-5xl font-extrabold leading-none mb-2">
                    {fmt(result.prixTTC)}
                  </p>
                  <p className="text-blue-200 text-sm font-semibold">DH TTC</p>
                  {result.estPromo && (
                    <span className="mt-3 bg-white/20 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-white/30">
                      🎯 Prix Promo
                    </span>
                  )}
                  <p className="mt-3 text-blue-100 text-xs">
                    Soit {fmt(result.prixTTC / parseInt(quantiteStr, 10))} dh TTC / ex.
                  </p>
                </div>
              </div>

              {/* NCR Numerotation tip */}
              {produit.type === 'carnet' && produit.numerotation && parseInt(quantiteStr, 10) >= produit.numerotation.offerte_a_partir_de && (
                <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 p-4 rounded-2xl">
                  <FaCheck className="text-green-500 flex-shrink-0" />
                  <p className="text-sm font-semibold">
                    🎁 Numérotation offerte pour cette quantité (≥ {produit.numerotation.offerte_a_partir_de} ex.)
                  </p>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  id="calc-btn-whatsapp"
                  onClick={handleQuoteRequest}
                  className="flex-1 flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-extrabold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-green-500/25 text-sm"
                >
                  <FaWhatsapp className="text-xl" />
                  Demander un devis WhatsApp
                </button>
                <button
                  id="calc-btn-email"
                  onClick={handleEmailRequest}
                  className="flex-1 flex items-center justify-center gap-2.5 bg-aria-primary hover:bg-aria-accent active:scale-95 text-white font-extrabold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-aria-primary/20 text-sm"
                >
                  <FaEnvelope className="text-lg" />
                  Envoyer par E-mail
                </button>
              </div>
            </div>
          )}

          {/* Empty / initial state */}
          {!result && (
            <div className="text-center py-10 text-gray-400">
              <FaCalculator className="text-5xl mx-auto mb-3 opacity-30" />
              <p className="font-semibold">Sélectionnez vos options pour voir le prix</p>
            </div>
          )}
        </div>

        {/* ── Info Footer ── */}
        <div className="px-6 md:px-8 py-5 bg-gray-50 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs text-gray-500 font-semibold">
            <div className="flex flex-col items-center gap-1.5">
              <FaClock className="text-aria-accent text-base" />
              <span>Délai 2–5 jours ouvrés</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <FaFileUpload className="text-aria-accent text-base" />
              <span>PDF · AI · PSD · CDR</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <FaTruck className="text-aria-accent text-base" />
              <span>Livraison partout au Maroc</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <FaTag className="text-aria-accent text-base" />
              <span>Prix HT — TVA 20% en sus</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PriceCalculator;
