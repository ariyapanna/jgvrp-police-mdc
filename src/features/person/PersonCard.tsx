import { Calendar, Eye, Files, Mars, Phone,  Venus } from "lucide-react"
import { toast } from "react-toastify";
import Spinner from "@/components/common/Spinner";

import type { Person } from "@/types/person/person";
import { Gender } from "@/types/person/gender";
import { copyToClipboard } from "@/utils/clipboard";
import { getInitials } from "@/utils/getInitials";

interface PersonCardProps
{
    loading: boolean;
    person: Person;
    onView: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const PersonCard = ({ loading, person, onView }: PersonCardProps) => {
    const GenderIcon = (person.gender === Gender.MALE) ? Mars : Venus;

    return (
        <div 
            className="bg-[#111111] border border-white/5 rounded-xl p-5 flex items-center justify-between group hover:border-white/10 transition-all hover:bg-[#141414] cursor-pointer"
        >
            <div className="flex items-center gap-5">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full overflow-hidden bg-black border border-white/10 shrink-0 flex items-center justify-center">
                    {person?.mugshot ? (
                        <img
                            src={person.mugshot}
                            alt={person.name}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition"
                        />
                    ) : (
                        <span className="text-lg font-black tracking-widest text-gray-400 select-none">
                            {getInitials(person.name)}
                        </span>
                    )}
                </div>
                
                {/* Identity Info */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-black text-gray-100 uppercase tracking-wide">
                        {person.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] font-medium">
                        <div className="
                            flex items-center gap-2
                            text-gray-500

                            transition-colors
                        ">
                            <GenderIcon className="w-4 h-4" />
                            <span className="font-semibold">{person.gender.toUpperCase()}</span>
                        </div>
                        <div className="
                            flex items-center gap-2
                            text-gray-500
                            transition-colors
                        ">
                            <Calendar className="w-4 h-4" />
                            <span className="font-semibold">{person.dateofbirth}</span>
                        </div>
                        <div className="flex items-center gap-2 group/phone">
                            <Phone className="
                                w-4 h-4 rotate-90
                                text-gray-500
                                transition-colors
                            " />

                            <span className="
                                font-mono tracking-wide
                                text-gray-500
                                transition-colors
                            ">
                                {person.phoneNumber}
                            </span>

                            <button
                                type="button"
                                className="
                                    p-1 rounded
                                    text-gray-500
                                    hover:text-blue-400
                                    hover:bg-white/5
                                    transition
                                    opacity-0
                                    group-hover:opacity-100
                                "
                                title="Copy phone number"
                                onClick={() => {
                                    copyToClipboard(person.phoneNumber)
                                    toast.info('Phone number copied to clipboard');
                                }}
                            >
                                <Files className="w-3.5 h-3.5" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* View Button */}
            <button onClick={onView} className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-500 transition-colors">
                {loading ?
                    <Spinner /> : <Eye className="w-5 h-5" />
                }
            </button>
        </div>
    )
}

export default PersonCard;