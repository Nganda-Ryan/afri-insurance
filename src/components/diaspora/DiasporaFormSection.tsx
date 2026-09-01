'use client';

import React, { useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Combobox } from '../ui/Combobox';

interface ProductChip {
    id: string;
    name: string;
    description: string;
}

const PRODUCTS: ProductChip[] = [
    { id: 'Afri Rapatriement', name: 'Afri Rapatriement', description: 'Rapatriement du corps vers le Cameroun en cas de décès' },
    { id: 'CCA Santé', name: 'CCA Santé', description: "Jusqu'à 80% des frais médicaux de vos proches couverts" },
    { id: 'C Secur', name: 'C Secur', description: 'Protection en cas de décès ou d\'invalidité' },
    { id: 'Afri Libre Retraite', name: 'Afri Libre Retraite', description: 'Épargne-projet flexible, à votre rythme' },
    { id: 'Afri Multirisque', name: 'Afri Multirisque', description: 'Protection du bien financé ou nanti' },
    { id: 'Afri Transport des Marchandises', name: 'Afri Transport des Marchandises', description: 'Récoltes et marchandises couvertes en transit' },
    { id: 'AfriKids Études', name: 'AfriKids Études', description: 'Continuité des études de vos enfants' },
    { id: 'Je ne sais pas encore', name: 'Je ne sais pas encore', description: 'Un conseiller m\'oriente vers le bon produit' },
];
const AGE_RANGES = [
    { label: "18-25 ans", value: "18-25" },
    { label: "26-35 ans", value: "26-35" },
    { label: "36-45 ans", value: "36-45" },
    { label: "46-55 ans", value: "46-55" },
    { label: "56-69 ans", value: "56-69" },
    { label: "70 ans et plus", value: "70+" },
];

export default function DiasporaFormSection() {
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [age, setAge] = useState("");
    const [isSubmitting] = useState(false);

    const toggleProduct = (productId: string) => {
        setSelectedProducts((prev) =>
            prev.includes(productId) ? prev.filter((p) => p !== productId) : [...prev, productId]
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // Thanks you.
    };

    return (
        <div className='bg-[#FBF7F3] '>
            {/* Comment ça marche part 1 */}
            <section className="pt-16 pb-2">
                <div className="max-w-[1080px] mx-auto px-7">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <div>
                            <p className="font-semibold text-xs uppercase text-[#E74F1C]">
                                Comment ça marche
                            </p>
                            <h2 className="text-lg md:text-2xl font-semibold mt-1">
                                Trois étapes, un seul formulaire
                            </h2>
                            <p className="text-[#68646E] text-md mt-3.5">
                                Pas de jargon, pas d&apos;engagement. Juste assez d&apos;informations pour qu&apos;un conseiller vous prépare une réponse utile.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex gap-3 items-start">
                                <span className="shrink-0 w-[30px] h-[30px] rounded-full bg-[#7030A0] text-white font-bold text-xs flex items-center justify-center font-sans">
                                    1
                                </span>
                                <p className="text-sm">
                                    <b className="block font-semibold mb-0.5">Vous nous parlez de vous</b>
                                    Coordonnées, pays de résidence, produit(s) qui vous intéresse(nt).
                                </p>
                            </div>

                            <div className="flex gap-3.5 items-start">
                                <span className="shrink-0 w-[30px] h-[30px] rounded-full bg-[#E74F1C] text-white font-bold text-xs flex items-center justify-center font-sans">
                                    2
                                </span>
                                <p className="text-sm">
                                    <b className="block font-semibold mb-0.5">Un conseiller étudie votre demande</b>
                                    Selon votre profil et vos besoins, il prépare une proposition adaptée.
                                </p>
                            </div>

                            <div className="flex gap-3.5 items-start">
                                <span className="shrink-0 w-[30px] h-[30px] rounded-full bg-[#7030A0] text-white font-bold text-xs flex items-center justify-center font-sans">
                                    3
                                </span>
                                <p className="text-sm ">
                                    <b className="block font-semibold mb-0.5">Vous recevez un retour personnalisé</b>
                                    Par téléphone, email ou WhatsApp — au choix, où que vous soyez.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* form part 2 */}
            <section className="pt-11 pb-22 " id="formulaire">
                <div className="max-w-[1080px] mx-auto px-7">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white border border-[#EBE2DC] rounded-[20px] shadow-[0_20px_50px_-25px_rgba(74,33,102,0.35)] overflow-hidden"
                    >
                        <div className="md:p-[34px_48px]">
                            <div className="flex items-center gap-3 w-full mb-5 font-sans">
                                <span className="shrink-0 w-[30px] h-[30px] rounded-full bg-[#7030A0] text-white font-bold text-xs flex items-center justify-center font-sans">
                                    1
                                </span>
                                <span className="font-bold">Vos coordonnées</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
                                <div>
                                    <label htmlFor="nom" className="block text-sm font-medium mb-1.5">
                                        Nom complet
                                    </label>
                                    <input
                                        type="text"
                                        id="nom"
                                        name="Nom complet"
                                        required
                                        autoComplete="name"
                                        className="w-full text-sm bg-[#FBF7F3] border border-[#EBE2DC] rounded-xl p-3 focus:outline-none focus:border-[#7030A0] focus:ring-4 focus:ring-[#7030A0]/14 transition-all"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="pays" className="block text-sm font-medium mb-1.5">
                                        Pays de résidence
                                    </label>
                                    <input
                                        type="text"
                                        id="pays"
                                        name="Pays de résidence"
                                        placeholder="Ex. France, Canada, États-Unis…"
                                        required
                                        className="w-full text-sm bg-[#FBF7F3] border border-[#EBE2DC] rounded-xl p-3 focus:outline-none focus:border-[#7030A0] focus:ring-4 focus:ring-[#7030A0]/14 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 mt-4.5">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                                        Adresse email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="Email"
                                        required
                                        autoComplete="email"
                                        className="w-full text-sm bg-[#FBF7F3] border border-[#EBE2DC] rounded-xl p-3 focus:outline-none focus:border-[#7030A0] focus:ring-4 focus:ring-[#7030A0]/14 transition-all"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="tel" className="block text-sm font-medium mb-1.5">
                                        Téléphone / WhatsApp <span className="font-xs text-[#68646E]">(avec indicatif pays)</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="tel"
                                        name="Téléphone"
                                        placeholder="Ex. +33 6 12 34 56 78"
                                        required
                                        autoComplete="tel"
                                        className="w-full text-sm bg-[#FBF7F3] border border-[#EBE2DC] rounded-xl p-3 focus:outline-none focus:border-[#7030A0] focus:ring-4 focus:ring-[#7030A0]/14 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-5 md:p-[34px_48px] border border-[#EBE2DC]">
                            <div className="flex items-center gap-3 w-full mb-5 font-sans">
                                <span className="shrink-0 w-[30px] h-[30px] rounded-full bg-[#7030A0] text-white font-bold text-xs flex items-center justify-center font-sans">
                                    2
                                </span>
                                <span className="font-bold ">Produit(s) qui vous intéresse(nt)</span>
                                <span className="text-xs text-[#68646E] ml-auto">Plusieurs choix possibles</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {PRODUCTS.map((product) => {
                                    const isChecked = selectedProducts.includes(product.id);
                                    return (
                                        <label
                                            key={product.id}
                                            onClick={() => toggleProduct(product.id)}
                                            className={`relative border rounded-xl p-3.5 cursor-pointer flex flex-col transition-all min-h-full ${isChecked
                                                ? 'bg-[#FCEEE6] border-[#E74F1C] shadow-[0_6px_18px_-10px_rgba(231,79,28,0.55)]'
                                                : 'bg-[#FBF7F3] border-[#EBE2DC]'
                                                }`}
                                        >
                                            <span className="font-semibold text-sm text-[#E74F1C]">{product.name}</span>
                                            <span className="text-xs text-[#68646E] mt-0.5">
                                                {product.description}
                                            </span>
                                            <span
                                                className={`absolute top-2.5 right-2.5 w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-colors ${isChecked ? 'bg-[#E74F1C] border-[#E74F1C]' : 'bg-white border-[#EBE2DC]'
                                                    }`}
                                            >
                                                {isChecked && (
                                                    <svg className="w-2.5 h-2.5" viewBox="0 0 10 8" fill="none">
                                                        <path
                                                            d="M1 4l3 3 5-6"
                                                            stroke="#ffffff"
                                                            strokeWidth="1.6"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                )}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="p-5 md:p-[34px_48px]">
                            <div className="flex items-center gap-3 w-full mb-5 font-sans">
                                <span className="shrink-0 w-[30px] h-[30px] rounded-full bg-[#7030A0] text-white font-bold text-xs flex items-center justify-center font-sans">
                                    3
                                </span>
                                <span className="font-bold">Votre profil</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
                                <div>
                                    <Combobox
                                        id="age"
                                        label="Tranche d'âge"
                                        options={AGE_RANGES}
                                        value={age}
                                        onChange={(val) => setAge(val)}
                                        placeholder="Sélectionner…"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1.5">
                                        Compte Diaspora CCA Bank ?
                                    </label>
                                    <div className="flex flex-wrap gap-2.5">
                                        {[
                                            { id: 'cca-oui', value: 'Oui, déjà ouvert', label: 'Oui' },
                                            { id: 'cca-non', value: 'Non, pas encore', label: 'Non' },
                                            { id: 'cca-nsp', value: 'Je ne sais pas', label: 'Je ne sais pas' },
                                        ].map((opt) => (
                                            <label key={opt.id} className="cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="Compte Diaspora CCA Bank"
                                                    value={opt.value}
                                                    id={opt.id}
                                                    required
                                                    className="peer sr-only"
                                                />
                                                <span className="inline-flex items-center border border-[#EBE2DC] bg-[#FBF7F3] rounded-full px-4 py-2 text-xs font-semibold  peer-checked:bg-[#4A2166] peer-checked:border-[#4A2166] peer-checked:text-white transition-all">
                                                    {opt.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 mt-4.5">
                                <div>
                                    <label htmlFor="profession" className="block text-sm font-medium mb-1.5">
                                        Profession <span className="font-xs text-[#68646E]">/ Secteur d&apos;activité</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="profession"
                                        name="Profession - Secteur"
                                        placeholder="Ex. Infirmier — Santé, Ingénieur — BTP…"
                                        className="w-full text-sm bg-[#FBF7F3] border border-[#EBE2DC] rounded-xl p-3 focus:outline-none focus:border-[#7030A0] focus:ring-4 focus:ring-[#7030A0]/14 transition-all"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="enfants" className="block text-sm font-medium mb-1.5">
                                        Enfants à charge <span className="font-xs text-[#68646E]">(nombre et âge)</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ex. 2 enfants, 5 et 9 ans"
                                        className="w-full text-sm bg-[#FBF7F3] border border-[#EBE2DC] rounded-xl p-3 focus:outline-none focus:border-[#7030A0] focus:ring-4 focus:ring-[#7030A0]/14 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="mt-4.5">
                                <label className="block text-sm font-medium mb-1.5">
                                    Moyen de contact préféré
                                </label>
                                <div className="flex flex-wrap gap-2.5">
                                    {[
                                        { id: 'ct-tel', value: 'Téléphone', label: 'Téléphone' },
                                        { id: 'ct-email', value: 'Email', label: 'Email' },
                                        { id: 'ct-wa', value: 'WhatsApp', label: 'WhatsApp' },
                                    ].map((ct) => (
                                        <label key={ct.id} className="cursor-pointer">
                                            <input
                                                type="radio"
                                                name="Contact préféré"
                                                value={ct.value}
                                                id={ct.id}
                                                required
                                                className="peer sr-only"
                                            />
                                            <span className="inline-flex items-center border border-[#EBE2DC] bg-[#FBF7F3] rounded-full px-4 py-2 text-xs font-semibold  peer-checked:bg-[#4A2166] peer-checked:border-[#4A2166] peer-checked:text-white transition-all">
                                                {ct.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4.5">
                                <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                                    Précisions sur votre besoin <span className="text-xs text-[#68646E]">(facultatif)</span>
                                </label>
                                <textarea
                                    placeholder="Ex. nombre de personnes à couvrir, échéance, questions particulières…"
                                    className="w-full text-sm bg-[#FBF7F3] border border-[#EBE2DC] rounded-xl p-3 focus:outline-none focus:border-[#7030A0] focus:ring-4 focus:ring-[#7030A0]/14 transition-all resize-y"
                                />
                            </div>
                        </div>

                        {/* Checkbox */}
                        <div className="p-5 md:p-[20px_48px] border-t border-[#EBE2DC]">
                            <label className="flex gap-3 items-start text-xs text-[#68646E] leading-relaxed cursor-pointer">
                                <Checkbox
                                    id="consent"
                                    required
                                    className="mt-0.5 border-[#7030A0] data-[state=checked]:bg-[#7030A0] data-[state=checked]:text-white focus-visible:ring-[#7030A0]"
                                />
                                <span>
                                    J&apos;accepte d&apos;être contacté(e) par AFRI INSURANCE / AFRILIFE INSURANCE au sujet de cette demande. Mes données ne sont utilisées que pour me répondre et ne sont pas transmises à des tiers.
                                </span>
                            </label>
                        </div>

                        <div className="p-6 md:p-[26px_48px_34px] flex flex-wrap items-center justify-between gap-5">
                            <p className="text-xs text-[#68646E] max-w-[34ch]">
                                Un conseiller revient vers vous sous 48h ouvrées, par le moyen que vous avez choisi.
                            </p>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[#E74F1C] hover:bg-[#d44315] disabled:opacity-60 text-white font-bold text-sm px-7 py-3.5 rounded-full transition-all shadow-[0_14px_30px_-14px_rgba(231,79,28,0.7)]"
                            >
                                {isSubmitting ? 'Envoi en cours…' : 'Envoyer ma demande'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}