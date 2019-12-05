local Tunnel = module("vrp", "lib/Tunnel")
local Proxy = module("vrp", "lib/Proxy")

vRP = Proxy.getInterface("vRP")
vRPclient = Tunnel.getInterface("vRP")

local veiculos = {}

Citizen.CreateThread(function ()
	while true do
		Citizen.Wait(0)
		DrawMarker(27, -29.842,-1104.661,26.500-1.0001, 0, 0, 0, 0, 0, 0, 1.0001,1.0001,1.0001, 0, 0, 0, 0.8, 0, 0, 0, 0, 0, 0, 0)
		if GetDistanceBetweenCoords(GetEntityCoords(PlayerPedId()), -29.842,-1104.661,26.422, true ) < 1 then
		 	if (IsControlJustReleased(1, 51)) then
            	TriggerServerEvent('get:carros')
		 	end
		end
	end
end)

RegisterNetEvent('send:carros')
AddEventHandler('send:carros', function(veiculos, identidade)
    IsInShopMenu = true
	SetNuiFocus(true, true)
	SendNUIMessage({
        show = true,
		veiculos = veiculos,
		identidade = identidade
	})
end)

RegisterNUICallback('comprar', function(data, cb)
	IsInShopMenu = false
	SetNuiFocus(false, false)
	local veh = data.id + 1
	TriggerServerEvent('comprar:carro', veh)	
end)

RegisterNUICallback('fechar', function()
    IsInShopMenu = false
    SetNuiFocus(false, false)
end)
